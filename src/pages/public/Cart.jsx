import { React, useState } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/cart/cart.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
// import assets
import koiproduct from "../../assets/koiproduct.png";
export const Cart = () => {
  // state
  const [quantity, setQuantity] = useState(4);
  return (
    <div className="cart-container">
      <Navbar />
      <div className="cart">
        <div className="cart-main">
          <div className="cart-item">
            <i className="bx bxs-trash-alt"></i>
            <img src={koiproduct} alt="" />
            <div className="cart-item-info">
              <h2>Mazuri Koi Diet</h2>
              <strong>$25.00</strong>
              <div>
                <p onClick={() => setQuantity(quantity + 1)}>+</p>
                <p>{quantity}</p>
                <p onClick={() => setQuantity(quantity - 1)}>-</p>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-summary">
          <div className="checkout-info">
            <div className="checkout-info-item">
              <p>Mazuri Koi Diet (x4)</p>
              <p>$25.00</p>
            </div>
          </div>
          <div className="total">
            <strong>Total</strong>
            <strong>$100</strong>
          </div>
          <Link to="/checkout">PROCEED TO CHECKOUT</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
