import React from "react";
// import styles
import "../../styles/paymentsuccess/paymentsuccess.css";
// import components
import { Checkoutnav } from "../../components/navbar/Checkoutnav";
export const PaymentSuccess = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get("paymentId");
  return (
    <div className="payment-success-container">
      <Checkoutnav />
      <div className="payment-success">
        <div className="payment-success-header">
          <i className="bx bx-check-circle"></i>
          <strong>Payment Successful</strong>
          <p>Thank you for choosing Izumiya, here is your invoice.</p>
        </div>
      </div>
    </div>
  );
};
