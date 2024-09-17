import React from "react";
import { Outlet } from "react-router-dom";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
// import styles
import "../../../styles/dashboard/adminorder/adminorder.css";
export const AdminOrderManage = () => {
  return (
    <div className="admin-order-container">
      <Dashnav />
      <div className="admin-order"></div>
      <Outlet />
    </div>
  );
};
