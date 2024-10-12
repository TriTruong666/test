import React from "react";
// import styles
import "../../../styles/dashboard/adminsummary/adminsummary.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";

export const Summary = () => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  return (
    <div className="admin-summary-container">
      <Dashnav />
      <div className="summary">
        <div className="admin-summary-header">
          <strong>Summary</strong>
        </div>
        <div className="section1">
          <div className="item">
            <strong>Welcome admin</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              minima aliquam totam sint cupiditate voluptas minus facere, veniam
              quasi autem voluptates libero ea recusandae numquam suscipit
              mollitia nam rem maiores.
            </p>
          </div>
          <div className="info">
            <div className="small-item">
              <div>
                <strong>{formatPrice(2500)}</strong>
                <p>Revenue</p>
              </div>
              <i className="bx bx-dollar"></i>
            </div>
            <div className="small-item">
              <div>
                <strong>20</strong>
                <p>Total orders</p>
              </div>
              <i className="bx bx-credit-card"></i>
            </div>
          </div>
        </div>
        <div className="section2">
          <div className="item">
            <div>
              <strong>Total active account</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <strong>Total active products</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <strong>Total active blogs</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
