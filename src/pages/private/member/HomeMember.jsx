import React from "react";
// import styles
import "../../../styles/dashboard/home/home.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
export const HomeMember = () => {
  return (
    <div className="homemem-dashboard-container">
      <Dashnav />
      <div className="homemem-dashboard"></div>
    </div>
  );
};
