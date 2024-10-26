import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleRejectOrderModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch, useSelector } from "react-redux";
// import service
import * as PaypalService from "../../service/paypal/paypal";
export const CancelOrder = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const paymentId = useSelector((state) => state.order.paymentId.paymentId);
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["rejectOrder"],
    mutationFn: PaypalService.rejectOrder,
  });
  // handle func
  const handleToggleCancelMyOrderModal = () => {
    dispatch(toggleRejectOrderModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(paymentId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="cancel-order-containter">
      <div className="cancel-order-modal">
        <div className="cancel-order-header">
          <strong>Cancel Order</strong>
          <i className="bx bx-x" onClick={handleToggleCancelMyOrderModal}></i>
        </div>
        <div className="cancel-order-main">
          <p>Are you sure to cancel order {paymentId}?</p>
        </div>
        <div className="submit">
          <button onClick={handleSubmit}>Cancel this order</button>
        </div>
      </div>
    </div>
  );
};
