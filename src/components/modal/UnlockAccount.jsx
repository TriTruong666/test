import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleUnlockAccountModal } from "../../redux/slices/modal/modal";
// import service
import * as AccountService from "../../service/account/AccountService";
export const UnlockAccount = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const userId = useSelector((state) => state.account.userId.userId);
  const accountInfo = useSelector(
    (state) => state.account.accountInfoNew.accountInfoNew
  );
  //   state
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const [submitData, setSubmitData] = useState({
    status: true,
  });
  //   mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["unlock-account", accountInfo?.userId],
    mutationFn: (updateData) => {
      AccountService.updateStatusAccount(accountInfo?.userId, updateData);
    },
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: () => {
      toast.success("Unlock successfully", {
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
  const handleToggleUnlockAccountModal = () => {
    dispatch(toggleUnlockAccountModal());
  };
  const handleUnlockAccount = async (e) => {
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
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="unlock-account-containter">
      <ToastContainer />
      <div className="unlock-account-modal">
        <div className="unlock-account-header">
          <strong>Unlock Account</strong>
          <i className="bx bx-x" onClick={handleToggleUnlockAccountModal}></i>
        </div>
        <div className="unlock-account-main">
          <p>Are you sure to unlock this account {accountInfo?.fullname}</p>
        </div>
        <div className="submit">
          <button onClick={handleUnlockAccount}>Unlock Confirm</button>
        </div>
      </div>
    </div>
  );
};
