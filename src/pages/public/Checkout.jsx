import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
// import styles
import "../../styles/checkout/checkout.css";
// import components
import { Checkoutnav } from "../../components/navbar/Checkoutnav";
// import assets
import koiproduct from "../../assets/koiproduct.png";
// import service
import * as CartService from "../../service/cart/cartService";
import * as PaypalService from "../../service/paypal/paypal";
export const Checkout = () => {
  // navigate
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  // state
  const [cartList, setCartList] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingPayment, setLoadingPayment] = useState(false);
  const [submitData, setSubmitData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    cartId: "",
    total: "",
  });
  const [guestCartList, setGuestCartList] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  // query
  const {
    data: cartData = {},
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
    refetchOnWindowFocus: false,
  });
  // mutation
  const paypalMutation = useMutation({
    mutationKey: ["paypal"],
    mutationFn: PaypalService.createPayment,
    onMutate: () => {
      setLoadingPayment(true);
    },
    onSuccess: () => {
      setLoadingPayment(false);
    },
  });
  useEffect(() => {
    document.title = "Checkout";
    if (token && user) {
      setSubmitData({
        ...submitData,
        fullname: user.
      })
      if (isLoading || isFetching) {
        setIsLoadingPage(true);
      } else {
        setIsLoadingPage(false);
        if (cartData && Array.isArray(cartData.cartItems)) {
          setCartList(cartData.cartItems);
        }
        
      }
      if (cartData && cartData.cartItems && cartData.cartItems.length === 0) {
        navigate("/shop");
      }
    } else {
      if (guestCartList.length === 0) {
        navigate("/shop");
      }
    }
  }, [
    isFetching,
    isLoading,
    token,
    user,
    cartData,
    cartList,
    guestCartList,
    navigate,
  ]);
  // handle func
  const handlePayNow = async () => {
    try {
      await paypalMutation.mutateAsync();
    } catch (error) {}
  };
  // calculator
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  const calculateItemPrice = (unitPrice, quantity) => {
    return unitPrice * quantity;
  };
  const calculateTotalPrice = () => {
    return cartList.reduce((total, item) => {
      return total + item.product.unitPrice * item.quantity;
    }, 0);
  };
  const calculateTotalPriceGuest = () => {
    return guestCartList.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
  };
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
              <input
                type="text"
                id="fullname"
                defaultValue={user?.fullname || "Guest"}
                placeholder="Enter full name"
              />
            </div>
            <div className="input-item">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                defaultValue={user?.email || ""}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-item">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                defaultValue={user?.phone || ""}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="input-item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                defaultValue={user?.address || ""}
                placeholder="Enter your address"
              />
            </div>
          </form>
        </div>
        <div className="cart-review">
          {isLoadingPage ? (
            <>
              <div className="loading">
                <ClipLoader color="#ffffff" size={40} />
              </div>
            </>
          ) : (
            <>
              {token && user ? (
                <>
                  <div className="cart-review-header">
                    <h2>Review Your Cart</h2>
                  </div>
                  <div className="cart-list">
                    {cartList.map((item) => (
                      <div key={item.cartItemId} className="cart-item">
                        <img src={item.product.image} alt="" />
                        <div className="info">
                          <div>
                            <strong>{item.product.productName}</strong>
                            <small>x{item.quantity}</small>
                          </div>
                          <p>{item.product.category.cateName}</p>

                          <span>{formatPrice(item.product.unitPrice)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div className="summary-item">
                      <p>Subtotal</p>
                      <p>{formatPrice(calculateTotalPrice())}</p>
                    </div>
                    <div className="summary-item">
                      <p>Shipping</p>
                      <p>Free</p>
                    </div>
                    <div className="summary-total">
                      <strong>Total</strong>
                      <strong>{formatPrice(calculateTotalPrice())}</strong>
                    </div>
                  </div>
                  <Link to="/payment">Pay Now</Link>
                </>
              ) : (
                <>
                  <div className="cart-review-header">
                    <h2>Review Your Cart</h2>
                  </div>
                  <div className="cart-list">
                    {guestCartList.map((item) => (
                      <div key={item.productId} className="cart-item">
                        <img src={item.image} alt="" />
                        <div className="info">
                          <div>
                            <strong>{item.productName}</strong>
                            <small>x{item.quantity}</small>
                          </div>
                          <p>{item.category.cateName}</p>

                          <span>
                            {formatPrice(
                              calculateItemPrice(item.unitPrice, item.quantity)
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-summary">
                    <div className="summary-item">
                      <p>Subtotal</p>
                      <p>{formatPrice(calculateTotalPriceGuest())}</p>
                    </div>
                    <div className="summary-item">
                      <p>Shipping</p>
                      <p>Free</p>
                    </div>
                    <div className="summary-total">
                      <strong>Total</strong>
                      <strong>{formatPrice(calculateTotalPriceGuest())}</strong>
                    </div>
                  </div>
                  <Link to="/payment">Pay Now</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
