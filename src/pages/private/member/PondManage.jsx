import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/pondmanage/pondmanage.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { PondList } from "../../../components/pond/PondList";
import { AddPond } from "../../../components/modal/AddPond";
import { UpdatePond } from "../../../components/modal/UpdatePond";
import { UpdateWater } from "../../../components/modal/UpdateWater";
import { AddKoi } from "../../../components/modal/AddKoi";
// import assets
import image from "../../../assets/logincover.jpg";
// import selector
import { useSelector, useDispatch } from "react-redux";
// import slices
import { toggleAddPondModal } from "../../../redux/slices/modal/modal";
export const PondManage = () => {
  // selector
  const isToggleAddPondModal = useSelector(
    (state) => state.modal.addPondModal.isToggleModal
  );
  const isToggleUpdatePondModal = useSelector(
    (state) => state.modal.updatePondModal.isToggleModal
  );
  const isToggleUpdateWaterModal = useSelector(
    (state) => state.modal.updateWaterModal.isToggleModal
  );
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleAddPondModal = () => {
    dispatch(toggleAddPondModal());
  };
  return (
    <div className="pondmanage-container">
      <Dashnav />
      <AddKoi />
      {isToggleUpdateWaterModal && <UpdateWater />}
      {isToggleUpdatePondModal && <UpdatePond />}
      {isToggleAddPondModal && <AddPond />}
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
          <div className="add" onClick={handleToggleAddPondModal}>
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
