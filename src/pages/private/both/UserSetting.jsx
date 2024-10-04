import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../../styles/dashboard/setting/setting.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
// import service
import * as AccountService from "../../../service/account/AccountService";
export const UserSetting = () => {
  // query
  const {
    data: myInfo,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["my-info"],
    queryFn: AccountService.getMyUserInfo,
    refetchOnWindowFocus: false,
  });
  // state
  const [isToggleChangePass, setIsToggleChangePass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [submitData, setSubmitData] = useState({
    fullname: myInfo && myInfo.fullname,
    phone: myInfo && myInfo.phone,
    address: myInfo && myInfo.address,
  });

  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountService.updateMyInfo,
    onSuccess: (responseData) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...user, ...responseData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Update Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
      queryClient.invalidateQueries({
        queryKey: ["update-info"],
      });
    },
  });
  // handle func
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (!isToggleChangePass) {
      setNewPass("");
      setConfirmPass("");
    }
  }, [isToggleChangePass, isFetching, isLoading]);

  // handle func
  const handleToggleChangePassTrue = () => {
    setIsToggleChangePass(true);
  };

  const handleToggleChangePassFalse = () => {
    setIsToggleChangePass(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  const handleOnSubmitInfo = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="user-setting-container">
      <Dashnav />
      <ToastContainer />
      <div className="user-setting">
        {isLoadingPage ? (
          <>
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          </>
        ) : (
          <>
            <div className="setting-header">
              <strong>{myInfo && myInfo.fullname}'s setting</strong>
            </div>
            <form
              action=""
              onSubmit={handleOnSubmitInfo}
              autoComplete="off"
              className="profile-form"
            >
              <div className="header">
                <strong>Profile Setting</strong>
                <p>You can customize your account infomation</p>
              </div>
              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  disabled
                  defaultValue={myInfo && myInfo.email}
                  placeholder="Enter your email"
                />
              </div>
              <div className="item">
                <label htmlFor="fullname">Your name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  defaultValue={myInfo && myInfo.fullname}
                  placeholder="Enter your full name"
                  onChange={handleOnChange}
                />
              </div>
              <div className="item">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={myInfo && myInfo.phone}
                  placeholder="Enter your phone number"
                  onChange={handleOnChange}
                />
              </div>
              <div className="item">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={myInfo && myInfo.address}
                  placeholder="Enter your address"
                  onChange={handleOnChange}
                />
              </div>
              <button>Update Infomation</button>
            </form>
            <form action="" autoComplete="off" className="security-form">
              <div className="header">
                <div>
                  <strong>Security Setting</strong>
                  <p>You can change your sensitive infomation</p>
                </div>
                {isToggleChangePass ? (
                  <span id="disable" onClick={handleToggleChangePassFalse}>
                    Disable change password
                  </span>
                ) : (
                  <span id="enable" onClick={handleToggleChangePassTrue}>
                    Enable change password
                  </span>
                )}
              </div>

              <div className="item">
                <label htmlFor="recent">Recent password</label>
                <input
                  type="password"
                  id="recent"
                  placeholder="Your recent password"
                  onChange={(e) => setNewPass(e.target.value)}
                  disabled={!isToggleChangePass}
                />
              </div>
              <div className="item">
                <label htmlFor="newpass">New password</label>
                <input
                  type="password"
                  id="newpass"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPass(e.target.value)}
                  value={newPass}
                  disabled={!isToggleChangePass}
                />
              </div>
              <div className="item">
                <label htmlFor="confirm">Confirm password</label>
                <input
                  type="password"
                  id="confirm"
                  placeholder="Enter confirm password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  value={confirmPass}
                  disabled={!isToggleChangePass}
                />
              </div>
              <button id="submit">Change Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
