import React from "react";
import { Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/pondmanage/pondmanage.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { PondList } from "../../../components/pond/PondList";
import { AddPond } from "../../../components/modal/AddPond";
// import assets
import image from "../../../assets/logincover.jpg";
export const PondManage = () => {
  return (
    <div className="pondmanage-container">
      <Dashnav />
      <AddPond />
      {/*  */}
      <div className="pondmanage">
        <div className="pondmanage-header">
          <strong>Pond Management</strong>
        </div>
        <div className="pondmanage-utils">
          <div className="search-pond">
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search pond..." />
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
            <p>Create new pond</p>
          </div>
        </div>
        <PondList />
      </div>
      {/*  */}
      {/* <div className="pondmanage-empty">
        <strong>No pond was selected</strong>
        <p>You can click to a pond to see detail</p>
      </div> */}
      <Outlet />
    </div>
  );
};
