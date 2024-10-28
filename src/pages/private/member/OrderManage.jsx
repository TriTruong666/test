import React from "react";
import { Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/ordermanage/ordermanage.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { MyOrderList } from "../../../components/myorder/MyOrderList";
import { CancelOrder } from "../../../components/modal/CancelOrder";
import { CreateRefund } from "../../../components/modal/CreateRefund";
// import redux
import { useSelector } from "react-redux";
export const OrderManage = () => {
  // selector
  const isToggleCancelMyOrderModal = useSelector(
    (state) => state.modal.rejectOrderModal.isToggleModal
  );
  const isToggleCreateRefundModal = useSelector(
    (state) => state.modal.createRefundModal.isToggleModal
  );
  return (
    <div className="order-manage-container">
      <Dashnav />
      {isToggleCreateRefundModal && <CreateRefund />}
      {isToggleCancelMyOrderModal && <CancelOrder />}
      <div className="order-manage">
        <div className="order-manage-header">
          <strong>My Order</strong>
        </div>
        <MyOrderList />
      </div>
      <Outlet />
    </div>
  );
};
