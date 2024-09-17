import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/myorder/myorder.css";
export const MyOrderList = () => {
  return (
    <div className="myorder-list">
      <Link to="/dashboard/myorder/detail">
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
