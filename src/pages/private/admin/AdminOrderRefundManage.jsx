import React from "react";
import { Outlet } from "react-router-dom";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { AdminRefundList } from "../../../components/adminrefund/AdminRefundList";
// import styles
import "../../../styles/dashboard/adminorder/adminorder.css";
export const AdminOrderRefundManage = () => {
  return (
    <div className="admin-order-container">
      <Dashnav />
      <div className="admin-order">
        <div className="admin-order-header">
          <strong>Refund Request List</strong>
        </div>
        <AdminRefundList />
      </div>
      <Outlet />
    </div>
  );
};
