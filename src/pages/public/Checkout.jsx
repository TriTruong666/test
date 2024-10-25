import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
// import styles
import "../../styles/checkout/checkout.css";
// import components
import { Checkoutnav } from "../../components/navbar/Checkoutnav";
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
  const [requiredField, setRequiredField] = useState(null);
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

  // query
  const {
    data: cartData = {},
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
    refetchOnWindowFocus: false,
  });

  // mutation
  const queryClient = useQueryClient();
  const paypalMutation = useMutation({
    mutationKey: ["checkout"],
    mutationFn: PaypalService.createPayment,
    onMutate: () => {
      setLoadingPayment(true);
    },
    onSuccess: () => {
      setLoadingPayment(false);
      queryClient.invalidateQueries(["my-cart"]);
    },
  });

  useEffect(() => {
    if (token && user) {
      setSubmitData({
        ...submitData,
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      if (isLoading || isFetching) {
        setIsLoadingPage(true);
      } else {
        setIsLoadingPage(false);
        if (cartData && Array.isArray(cartData.cartItems)) {
          setCartList(cartData.cartItems);
          setSubmitData({
            ...submitData,
            cartId: cartData.cartId || "",
          });
        }
      }
    } else {
      navigate("/shop");
    }
  }, [isFetching, isLoading, cartData]);

  // handle func
  const handlePayNow = async () => {
    if (
      !submitData.address ||
      !submitData.email ||
      !submitData.fullname ||
      !submitData.phone
    ) {
      setRequiredField("You have to input all fields");
      return;
    }
    setRequiredField(null);
    try {
      const totalPrice = calculateTotalPrice();
      const updatedSubmitData = {
        ...submitData,
        total: totalPrice || "0",
      };
      localStorage.setItem("orderReq", JSON.stringify(updatedSubmitData));
      await paypalMutation.mutateAsync(updatedSubmitData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };

  // calculator
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  const calculateTotalPrice = () => {
    return cartList.reduce((total, item) => {
      return total + item.product.unitPrice * item.quantity;
    }, 0);
  };

  return (
    <div className="checkout-container">
      {isLoadingPayment && (
        <div className="loading-payment">
          <SyncLoader color="#ffffff" size={20} />
        </div>
      )}
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
                name="phone"
                defaultValue={user?.phone || ""}
                onChange={handleOnChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="input-item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={user?.address || ""}
                onChange={handleOnChange}
                placeholder="Enter your address"
              />
            </div>
            {requiredField && <p className="error">{requiredField}</p>}
          </form>
        </div>
        <div className="cart-review">
          {isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#ffffff" size={40} />
            </div>
          ) : (
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
              <Link onClick={handlePayNow}>Pay Now</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
