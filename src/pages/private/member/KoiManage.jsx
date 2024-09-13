import React from "react";
// import styles
import "../../../styles/dashboard/koimanage/koimanage.css";
// import components
import { KoiList } from "../../../components/koi/KoiList";
export const KoiManage = () => {
  return (
    <div className="koimamange-container">
      <div className="koimanage-header">
        <div className="header">
          <strong>Koi List</strong>
          <p>Manage all your Koi in this pond</p>
        </div>
        <div className="add-koi">
          <i className="bx bx-plus"></i>
          <p>Add New Koi</p>
        </div>
      </div>
      <KoiList />
    </div>
  );
};
