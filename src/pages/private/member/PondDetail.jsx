import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/ponddetail/ponddetail.css";
// import dispatch
import { useDispatch } from "react-redux";
// import slices
import { toggleUpdatePondModal } from "../../../redux/slices/modal/modal";
export const PondDetail = () => {
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdatePondModal());
  };
  return (
    <div className="pond-detail-container">
      <div className="pond-detail-header">
        <strong>Pond Detail #123124</strong>
        <div>
          <i
            className="bx bx-edit-alt"
            onClick={handleToggleUpdatePondModal}
          ></i>
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
