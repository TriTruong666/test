import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/adminorder/adminorder.css";
export const AdminOrderList = () => {
  return (
    <div className="admin-order-list">
      <Link to="/dashboard/admin/order/detail">
        <div>
          <strong>Your Order Id</strong>
          <p>7 items</p>
        </div>
        <p>$225.00</p>
        <span>Status: Success</span>
      </Link>
    </div>
  );
};
