import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// import styles
import "../../../styles/dashboard/adminaccount/adminaccount.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { AccountList } from "../../../components/account/AccountList";
import { DelAccount } from "../../../components/modal/DelAccount";
export const AdminAccountManage = () => {
  const isToggleDelAccountModal = useSelector(
    (state) => state.modal.deleteAccountModal.isToggleModal
  );
  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);
  return (
    <div className="admin-account-container">
      {isToggleDelAccountModal && <DelAccount />}
      <Dashnav />
      <div className="admin-account">
        <div className="admin-account-header">
          <strong>Account Manager</strong>
        </div>
        <div className="admin-account-utils">
          <div className="search-account">
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search account..." />
          </div>
          <div className="filter">
            <select name="" id="">
              <option value="">Filter</option>
              <option value="">By Status</option>
              <option value="">By size</option>
              <option value="">By Number of Koi</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div>
          <div className="add">
            <i className="bx bx-plus"></i>
            <p>Create new account</p>
          </div>
        </div>
        <AccountList />
      </div>
    </div>
  );
};
