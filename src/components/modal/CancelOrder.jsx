import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleRejectOrderModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch, useSelector } from "react-redux";
// import service
import ClipLoader from "react-spinners/ClipLoader";
import * as PaypalService from "../../service/paypal/paypal";
export const CancelOrder = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const orderId = useSelector((state) => state.order.orderId.orderId);
  const orderInfo = useSelector((state) => state.order.orderInfo.orderInfo);
  // state
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["reject-order", orderInfo?.orderId],
    mutationFn: PaypalService.rejectOrder,
    onMutate: () => {
      setIsLoadingModal(true);
    },
    onSuccess: () => {
      toast.success("Cancel order success", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoadingModal(false);
      queryClient.invalidateQueries(["order-detail"]);
      queryClient.invalidateQueries(["all-orders"]);
    },
  });
  // handle func
  const handleToggleCancelMyOrderModal = () => {
    dispatch(toggleRejectOrderModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(orderInfo?.orderId);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  return (
    <div className="cancel-order-containter">
      <ToastContainer />
      <div className="cancel-order-modal">
        {isLoadingModal ? (
          <>
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          </>
        ) : (
          <>
            <div className="cancel-order-header">
              <strong>Cancel Order</strong>
              <i
                className="bx bx-x"
                onClick={handleToggleCancelMyOrderModal}
              ></i>
            </div>
            <div className="cancel-order-main">
              <p>
                Are you sure to cancel order of date{" "}
                {formatDate(orderInfo.createDate)} ?
              </p>
            </div>
            <div className="submit">
              <button onClick={handleSubmit}>Cancel this order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
