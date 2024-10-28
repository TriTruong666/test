import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import styles
import "../../styles/buynow/buynow.css";
// import components
import { Checkoutnav } from "../../components/navbar/Checkoutnav";
// import service
import * as ProductService from "../../service/product/productService";
import * as PaypalService from "../../service/paypal/paypal";
import SyncLoader from "react-spinners/SyncLoader";
export const Buynow = () => {
  // param
  const { productId } = useParams();
  // navigate
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  //   state
  const [quantity, setQuantity] = useState(1);
  const [requiredField, setRequiredField] = useState(null);
  const [isLoadingPayment, setLoadingPayment] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [submitData, setSubmitData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    total: "",
    productId: "",
    quantity: "",
  });
  // query
  const {
    data: productInfo = {},
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["product-detail", productId],
    queryFn: () => ProductService.detailProductService(productId),
  });
  //
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["buynow"],
    mutationFn: PaypalService.buyNow,
    onMutate: () => {
      setLoadingPayment(true);
    },
    onSuccess: (response) => {
      if (response?.code === "PRODUCT_IS_INACTIVE") {
        toast.error("This product is not available for sale now!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setLoadingPayment(false);
      } else {
        setLoadingPayment(false);
        queryClient.invalidateQueries(["products"]);
      }
    },
  });
  // handle func
  const handlePlus = () => {
    if (quantity < productInfo?.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Sorry, our stock is not enough!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleMinus = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (!productInfo?.productId) {
      navigate("/shop");
    }
    if (token && user) {
      setSubmitData({
        ...submitData,
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        productId: productInfo.productId || "",
        quantity: quantity || 1,
      });
    }
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
      setSubmitData({
        ...submitData,
        productId: productInfo.productId || "",
        quantity: quantity || "",
      });
    }
  }, [isLoading, isFetching, productInfo, quantity]);
  //   calculator
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  const handleTotalPrice = (price, quantity) => {
    return price * quantity;
  };
  const handlePayNow = async (e) => {
    e.preventDefault();
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
      const totalPrice = handleTotalPrice(productInfo.unitPrice, quantity);
      const updatedSubmitData = {
        ...submitData,
        total: totalPrice || "0",
      };
      localStorage.setItem("orderReqBuy", JSON.stringify(updatedSubmitData));
      await mutation.mutateAsync(updatedSubmitData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="buynow-container">
      <ToastContainer />
      {isLoadingPayment && (
        <>
          <div className="loading-payment">
            <SyncLoader color="#ffffff" size={20} />
          </div>
        </>
      )}
      <Checkoutnav />
      <div className="buynow">
        <div className="buynow-main">
          <div className="buynow-main-header">
            <h2>Checkout</h2>
            <Link to="/shop">
              <i className="bx bx-arrow-back"></i>
              <p>Back to shop</p>
            </Link>
          </div>
          <form action="" autoComplete="off" className="buynow-form">
            <div className="input-item">
              <label htmlFor="fullname">Full name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                defaultValue={user.fullname || ""}
                placeholder="Enter full name"
                onChange={handleOnChange}
              />
            </div>
            <div className="input-item">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                defaultValue={user.email || ""}
                name="email"
                placeholder="Enter your email"
                onChange={handleOnChange}
              />
            </div>
            <div className="input-item">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                defaultValue={user.phone || ""}
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleOnChange}
              />
            </div>
            <div className="input-item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                defaultValue={user.address || ""}
                name="address"
                id="address"
                placeholder="Enter your address"
                onChange={handleOnChange}
              />
            </div>
            {requiredField && <p className="error">{requiredField}</p>}
          </form>
        </div>
        <div className="cart-review">
          <div className="cart-review-header">
            <h2>Review Your Cart</h2>
          </div>
          <div className="cart-list">
            <div className="cart-item">
              <img src={productInfo.image} alt="" />
              <div className="info">
                <div>
                  <strong>{productInfo.productName}</strong>
                  <small>x{quantity}</small>
                </div>
                <p>{productInfo?.category?.cateName}</p>
                <div className="quantity">
                  <span>{formatPrice(productInfo.unitPrice)}</span>

                  <div>
                    <p onClick={handlePlus}>+</p>
                    <p>{quantity}</p>
                    <p onClick={handleMinus}>-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-summary">
            <div className="summary-item">
              <p>Subtotal</p>
              <p>
                {formatPrice(handleTotalPrice(productInfo.unitPrice, quantity))}
              </p>
            </div>
            <div className="summary-item">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="summary-total">
              <strong>Total</strong>
              <strong>
                {formatPrice(handleTotalPrice(productInfo.unitPrice, quantity))}
              </strong>
            </div>
          </div>
          <Link onClick={handlePayNow}>Pay Now</Link>
        </div>
      </div>
    </div>
  );
};
