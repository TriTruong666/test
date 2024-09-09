import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/checkout/checkout.css";
// import components
import { Checkoutnav } from "../../components/navbar/Checkoutnav";
// import assets
import koiproduct from "../../assets/koiproduct.png";
export const Checkout = () => {
  return (
    <div className="checkout-container">
      <Checkoutnav />
      <div className="checkout">
        <div className="checkout-main">
          <div className="checkout-main-header">
            <h2>Checkout</h2>
            <Link to="/cart">
              <i className="bx bx-arrow-back"></i>
              <p>Back to cart</p>
            </Link>
          </div>
          <form action="" autoComplete="off" className="checkout-form">
            <div className="input-item">
              <label htmlFor="fullname">Full name</label>
              <input type="text" id="fullname" placeholder="Enter full name" />
            </div>
            <div className="input-item">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-item">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="input-item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
              />
            </div>
          </form>
        </div>
        <div className="cart-review">
          <div className="cart-review-header">
            <h2>Review Your Cart</h2>
          </div>
          <div className="cart-list">
            <div className="cart-item">
              <img src={koiproduct} alt="" />
              <div>
                <strong>Mazuri Koi Diet</strong>
                <small>x4</small>
                <p>Koi food</p>
                <span>$100</span>
              </div>
            </div>
            <div className="cart-item">
              <img src={koiproduct} alt="" />
              <div>
                <strong>Mazuri Koi Diet</strong>
                <small>x4</small>
                <p>Koi food</p>
                <span>$100</span>
              </div>
            </div>
          </div>
          <div className="cart-summary">
            <div className="summary-item">
              <p>Subtotal</p>
              <p>$100</p>
            </div>
            <div className="summary-item">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="summary-total">
              <strong>Total</strong>
              <strong>$100</strong>
            </div>
          </div>
          <Link to="/payment">Pay Now</Link>
        </div>
      </div>
    </div>
  );
};
