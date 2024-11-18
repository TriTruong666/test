import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleDeleteAccountModal } from "../../redux/slices/modal/modal";
// import service
import * as AccountService from "../../service/account/AccountService";
export const DelAccount = () => {
  // dispatch
  const dispatch = useDispatch();
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  // selector
  const userId = useSelector((state) => state.account.userId.userId);
  const accountInfo = useSelector(
    (state) => state.account.accountInfoNew.accountInfoNew
  );
  //   mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["del-account", accountInfo?.userId],
    mutationFn: AccountService.deleteAccount,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: () => {
      toast.success("Block successfully", {
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
        setIsPreventSubmit(false);
      }, 1500);
      queryCilent.invalidateQueries(["accounts"]);
    },
  });
  //   handle func
  const handleToggleDelAccountModal = () => {
    dispatch(toggleDeleteAccountModal());
  };
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (isPreventSubmit) {
      toast.error("On going process, try again later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      await mutation.mutateAsync(accountInfo?.userId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="del-account-containter">
      <ToastContainer />
      <div className="del-account-modal">
        <div className="del-account-header">
          <strong>Block Account</strong>
          <i className="bx bx-x" onClick={handleToggleDelAccountModal}></i>
        </div>
        <div className="del-account-main">
          <p>Are you sure to block this account {accountInfo?.fullname}</p>
        </div>
        <div className="submit">
          <button onClick={handleDeleteAccount}>Block Confirm</button>
        </div>
      </div>
    </div>
  );
};
