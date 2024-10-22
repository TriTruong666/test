import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import styles
import "../../../styles/dashboard/adminorderdetail/adminorderdetail.css";
// import service
import * as OrderService from "../../../service/order/order";
import ClipLoader from "react-spinners/ClipLoader";
export const AdminOrderDetail = () => {
  const orderStatus = {
    pending: "pending",
    approved: "approved",
    rejected: "rejected",
    refunded: "refunded",
  };
  // param
  const { orderId } = useParams();
  // state
  const [orderListProduct, setOrderListProduct] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: orderInfo = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => OrderService.getOrderById(orderId),
  });
  // handle func
  const handleSetClassNameStatus = (status) => {
    if (status === "PENDING") {
      return orderStatus.pending;
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
    if (orderInfo && orderInfo.code === "ORDER_NOT_FOUND") {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    if (orderInfo && orderInfo.orderDetails) {
      setOrderListProduct(orderInfo.orderDetails);
    } else {
      setOrderListProduct([]);
    }
  }, [orderInfo, isFetching, isError, isLoading]);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  return (
    <div className="admin-order-detail-container">
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
            <h2>Order is not found</h2>
            <p>Please check ID of order or it had been delete !</p>
          </div>
        </>
      ) : (
        <>
          <div className="admin-order-detail-header">
            <h2>{orderInfo.fullname}'s Order</h2>
            <p className={handleSetClassNameStatus(orderInfo.status)}>
              {orderInfo.status}
            </p>
          </div>
          <div className="admin-order-main">
            <table className="cart">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total price</th>
                </tr>
              </thead>
              <tbody>
                {orderListProduct.map((product, index) => (
                  <tr key={product.productId}>
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td>{product.quantity}</td>
                    <td>{formatPrice(product.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="info">
              <div className="header">
                <strong>Order Information</strong>
                <p>View all my infomation when ordering</p>
              </div>
              <div className="main">
                <div className="info-item">
                  <strong>Date</strong>
                  <p>
                    {new Date(
                      orderInfo && orderInfo.createDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="info-item">
                  <strong>Name</strong>
                  <p>{orderInfo.fullname}</p>
                </div>
                <div className="info-item">
                  <strong>Email</strong>
                  <p>{orderInfo.email}</p>
                </div>
                <div className="info-item">
                  <strong>Phone</strong>
                  <p>{orderInfo.phone}</p>
                </div>
                <div className="info-item">
                  <strong>Payment ID</strong>
                  <p>{orderInfo.paymentId}</p>
                </div>
                <div className="info-item">
                  <strong>Payment method</strong>
                  <p>Paypal</p>
                </div>
                <div className="info-item">
                  <strong>Invoice amount</strong>
                  <p>{formatPrice(orderInfo.total)}</p>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button>
                <i className="bx bx-check"></i>
                <p>Mark as Approved</p>
              </button>
              <button>
                <i className="bx bx-x"></i>
                <p>Mark as Rejected</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
