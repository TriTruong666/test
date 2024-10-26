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
import { KoiDetail } from "../../../components/modal/KoiDetail";
import { DelPond } from "../../../components/modal/DelPond";
import { DelKoi } from "../../../components/modal/DelKoi";
import { UpdateKoi } from "../../../components/modal/UpdateKoi";
import { AddKoiLog } from "../../../components/modal/AddKoiLog";
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
  const isToggleAddKoiModal = useSelector(
    (state) => state.modal.addKoiModal.isToggleModal
  );
  const isToggleKoiDetailModal = useSelector(
    (state) => state.modal.detailKoiModal.isToggleModal
  );
  const isToggleDelPondModal = useSelector(
    (state) => state.modal.delPondModal.isToggleModal
  );
  const isToggleDelKoiModal = useSelector(
    (state) => state.modal.delKoiModal.isToggleModal
  );
  const isToggleUpdateKoiModal = useSelector(
    (state) => state.modal.updateKoiModal.isToggleModal
  );
  const isToggleKoiLogModal = useSelector(
    (state) => state.modal.addKoiLogModal.isToggleModal
  );

  return (
    <div className="pondmanage-container">
      <Dashnav />
      {isToggleUpdateKoiModal && <UpdateKoi />}
      {isToggleDelKoiModal && <DelKoi />}
      {isToggleDelPondModal && <DelPond />}
      {isToggleKoiDetailModal && <KoiDetail />}
      {isToggleAddKoiModal && <AddKoi />}
      {isToggleUpdateWaterModal && <UpdateWater />}
      {isToggleUpdatePondModal && <UpdatePond />}
      {isToggleAddPondModal && <AddPond />}
      {isToggleKoiLogModal && <AddKoiLog />}
      {/*  */}
      <div className="pondmanage">
        <div className="pondmanage-header">
          <strong>Pond Management</strong>
        </div>
        <PondList />
      </div>
      <Outlet />
    </div>
  );
};
