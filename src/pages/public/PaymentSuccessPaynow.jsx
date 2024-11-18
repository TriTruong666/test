import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import styles
import "../../styles/paymentsuccess/paymentsuccess.css";
// import components
// import service
import * as OrderService from "../../service/order/order";
import ClipLoader from "react-spinners/ClipLoader";
export const PaymentSuccessPaynow = () => {
  // navigation
  const navigate = useNavigate();
  //
  const orderReqBuy = JSON.parse(localStorage.getItem("orderReqBuy"));
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get("paymentId");
  // state
  const [submitData, setSubmitData] = useState({
    fullname: orderReqBuy.fullname || "",
    email: orderReqBuy.email || "",
    phone: orderReqBuy.phone || "",
    address: orderReqBuy.address || "",
    total: orderReqBuy.total || "",
    productId: orderReqBuy.productId || "",
    quantity: orderReqBuy.quantity || "",
    paymentId: paymentId || "",
  });
  const [responseData, setResponseData] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-order"],
    mutationFn: OrderService.createInvoiceBuyNow,
    onMutate: () => {
      setIsLoadingPage(true);
    },
    onSuccess: (response) => {
      setIsLoadingPage(false);
      setResponseData(response);
      queryClient.invalidateQueries("my-orders");
    },
  });
  // handle func
  const handleReturn = () => {
    localStorage.removeItem("orderReq");
    navigate("/");
  };
  const createOrder = async () => {
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      createOrder();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  return (
    <div className="payment-success-container">
      {isLoadingPage && (
        <>
          <div className="loading">
            <ClipLoader color="#ffffff" size={70} />
          </div>
        </>
      )}
      <div className="payment-success">
        <div className="payment-success-header">
          <i className="bx bxs-check-circle"></i>
          <strong>Payment Success!</strong>
          <p>Thank you for choosing Izumiya, here is your invoice.</p>
        </div>
        <div className="invoice">
          <div className="item">
            <p>Payment ID</p>
            <strong>{paymentId}</strong>
          </div>
          <div className="item">
            <p>Create Date</p>
            <strong>
              {new Date(
                responseData && responseData.createDate
              ).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </strong>
          </div>
          <div className="item">
            <p>Payment Method</p>
            <strong>Paypal</strong>
          </div>
          <div className="item">
            <p>Customer</p>
            <strong>{submitData.fullname}</strong>
          </div>
        </div>
        <div className="total">
          <p>Total</p>
          <strong>{formatPrice(submitData.total)}</strong>
        </div>
        <button onClick={handleReturn}>Return to homepage</button>
      </div>
    </div>
  );
};
