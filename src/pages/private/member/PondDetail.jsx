import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
// import styles
import "../../../styles/dashboard/ponddetail/ponddetail.css";
// import dispatch
import { useDispatch } from "react-redux";
// import slices
import { toggleUpdatePondModal } from "../../../redux/slices/modal/modal";
import { toggleDelPondModal } from "../../../redux/slices/modal/modal";
export const PondDetail = () => {
  // param
  const { pondId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdatePondModal());
  };
  const handleToggleDelPondModal = () => {
    dispatch(toggleDelPondModal());
  };
  return (
    <div className="pond-detail-container">
      <div className="pond-detail-header">
        <strong>Pond Detail #{pondId}</strong>
        <div>
          <i
            className="bx bx-edit-alt"
            onClick={handleToggleUpdatePondModal}
          ></i>
          <i className="bx bx-trash-alt" onClick={handleToggleDelPondModal}></i>
        </div>
      </div>
      <div className="pond-detail-link">
        <NavLink
          to={`/dashboard/mypond/detail/info/${pondId}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Infomation
        </NavLink>
        <NavLink
          to={`/dashboard/mypond/detail/water/${pondId}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Water
        </NavLink>
        <NavLink
          to={`/dashboard/mypond/detail/kois/${pondId}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Kois
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
