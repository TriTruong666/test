import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../../styles/dashboard/adminrefunddetail/adminrefunddetail.css";
// import service
import * as RefundService from "../../../service/refund/refund";
import ClipLoader from "react-spinners/ClipLoader";
export const AdminOrderRefundDetail = () => {
  const orderStatus = {
    pending: "pending",
    approved: "approved",
    rejected: "rejected",
    refunded: "refunded",
  };
  // param
  const { refundId } = useParams();
  const { orderId } = useParams();
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: refundInfo = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["refund-info", refundId],
    queryFn: () => RefundService.getRefundRequestDetail(refundId),
  });
  // mutation
  const queryClient = useQueryClient();
  const rejectMutation = useMutation({
    mutationKey: ["reject-refund", orderId],
    mutationFn: RefundService.rejectedRefund,
    onMutate: () => {
      setIsLoadingPage(true);
    },
    onSuccess: () => {
      toast.success("Request refund rejected", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoadingPage(false);
    },
  });
  const approveMutation = useMutation({
    mutationKey: ["approve-refund", orderId],
    mutationFn: RefundService.approvedRefund,
    onMutate: () => {
      setIsLoadingPage(true);
    },
    onSuccess: () => {
      toast.success("Request refund approved", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoadingPage(false);
      queryClient.invalidateQueries(["refund-info"]);
      queryClient.invalidateQueries(["all-refund"]);
    },
  });
  // handle func
  const handleSetClassNameStatus = (status) => {
    if (status === "PENDING") {
      return orderStatus.pending;
    }
    if (status === "APPROVED") {
      return orderStatus.approved;
    }
    if (status === "REJECTED") {
      return orderStatus.rejected;
    }
  };
  const handleApproveRequest = async () => {
    try {
      if (orderId) {
        await approveMutation.mutateAsync(orderId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRejectRequest = async () => {
    try {
      if (orderId) {
        await rejectMutation.mutateAsync(orderId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isLoading || isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
    if (refundInfo && refundInfo.code === "ORDER_NOT_FOUND") {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [refundInfo, isFetching, isError, isLoading]);
  return (
    <div className="admin-refund-detail-container">
      <ToastContainer />
      {serverError ? (
        <>
          <div className="error-page">
            <p>{serverError}</p>
          </div>
        </>
      ) : isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
        </>
      ) : isNotFound ? (
        <>
          <div className="not-found">
            <h2>Request is not found</h2>
            <p>Please check ID of request or it had been delete !</p>
          </div>
        </>
      ) : (
        <>
          <div className="admin-refund-detail-header">
            <h2>Refund Infomation</h2>
            <p className={handleSetClassNameStatus(refundInfo.status)}>
              {refundInfo.status}
            </p>
          </div>
          <div className="admin-refund-main">
            <div className="info">
              <div className="header">
                <strong>Customer reason</strong>
                <p>{refundInfo.refundReason}</p>
              </div>
              <div className="main">
                <img src={refundInfo.refundReasonImage} alt="" />
              </div>
            </div>
            <div className="buttons">
              {refundInfo?.status === "APPROVED" ? (
                <>
                  <button className="marked-approved">
                    <i className="bx bx-check"></i>
                    <p>Marked as Approved</p>
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled={refundInfo?.status === "REJECTED"}
                    className={refundInfo?.status === "REJECTED" && "prevent"}
                    onClick={handleApproveRequest}
                  >
                    <i className="bx bx-check"></i>
                    <p>Mark as Approved</p>
                  </button>
                </>
              )}
              {refundInfo?.status === "REJECTED" ? (
                <>
                  <button className="marked-rejected">
                    <i className="bx bx-check"></i>
                    <p>Marked as Rejected</p>
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled={refundInfo?.status === "APPROVED"}
                    onClick={handleRejectRequest}
                    className={refundInfo?.status === "APPROVED" && "prevent"}
                  >
                    <i className="bx bx-x"></i>
                    <p>Mark as Rejected</p>
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
