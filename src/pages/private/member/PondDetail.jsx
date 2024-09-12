import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/ponddetail/ponddetail.css";
export const PondDetail = () => {
  return (
    <div className="pond-detail-container">
      <div className="pond-detail-header">
        <strong>Pond Detail #123124</strong>
        <div>
          <i className="bx bx-edit-alt"></i>
          <i className="bx bx-trash-alt"></i>
        </div>
      </div>
      <div className="pond-detail-link">
        <NavLink
          to="/dashboard/mypond/detail/info"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Infomation
        </NavLink>
        <NavLink
          to="/dashboard/mypond/detail/water"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Water
        </NavLink>
        <NavLink
          to="/dashboard/mypond/detail/kois"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Kois
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
