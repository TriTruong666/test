import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import styles
import "../../styles/cart/cart.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
import koiproduct from "../../assets/koiproduct.png";
// import service
import * as CartService from "../../service/cart/cartService";
export const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  // state
  const [quantity, setQuantity] = useState(4);
  const [cartList, setCartList] = useState([]);
  // query
  const {
    data: cartData = {},
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
  });
  useEffect(() => {
    document.title = "Cart";
    if (cartData) {
      setCartList(cartData.items);
    }
  }, []);
  return (
    <div className="cart-container">
      <Navbar />
      <Settingnav />
      <div className="cart">
        <div className="cart-main">
          {cartList.map((item) => (
            <div key={item.productId} className="cart-item">
              <i className="bx bxs-trash-alt"></i>
              <img src={koiproduct} alt="" />
              <div className="cart-item-info">
                <h2>Mazuri Koi Diet</h2>
                <strong>$25.00</strong>
                <div>
                  <p onClick={() => setQuantity(quantity + 1)}>+</p>
                  <p>{item.quantity}</p>
                  <p onClick={() => setQuantity(quantity - 1)}>-</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <div className="checkout-info">
            {cartList.map((item) => (
              <div key={item.productId} className="checkout-info-item">
                <p>Mazuri Koi Diet (x{item.quantity})</p>
                <p>$25.00</p>
              </div>
            ))}
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
