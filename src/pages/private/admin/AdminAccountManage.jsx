import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import styles
import "../../../styles/dashboard/adminaccount/adminaccount.css";
// import components
import { AccountList } from "../../../components/account/AccountList";
import { DelAccount } from "../../../components/modal/DelAccount";
import { UnlockAccount } from "../../../components/modal/UnlockAccount";
import { Dashnav } from "../../../components/navbar/Dashnav";
import { AddAccountAdmin } from "../../../components/modal/AddAccountAdmin";
export const AdminAccountManage = () => {
  const isToggleDelAccountModal = useSelector(
    (state) => state.modal.deleteAccountModal.isToggleModal
  );
  const isToggleAddAccountModal = useSelector(
    (state) => state.modal.addAccountModal.isToggleModal
  );
  const isToggleUnlockAccountModal = useSelector(
    (state) => state.modal.unlockAccountModal.isToggleModal
  );
  return (
    <div className="admin-account-container">
      {isToggleUnlockAccountModal && <UnlockAccount />}
      {isToggleAddAccountModal && <AddAccountAdmin />}
      {isToggleDelAccountModal && <DelAccount />}
      <Dashnav />
      <div className="admin-account">
        <div className="admin-account-header">
          <strong>Account Manager</strong>
        </div>
        <AccountList />
      </div>
    </div>
  );
};
