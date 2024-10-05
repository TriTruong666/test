import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/cart/cart.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { Settingnav } from "../../components/navbar/Settingnav";
// import service
import * as CartService from "../../service/cart/cartService";
export const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  // state
  const [quantity, setQuantity] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
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
  const queryClient = useQueryClient();
  const quantityMutation = useMutation({
    mutationKey: ["update-quantity", cartData && cartData.cartId],
    mutationFn: ({ cartId, cartItemId, quantity }) => {
      return CartService.updateQuantity(cartId, cartItemId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-cart"]);
    },
  });
  const deleteMutation = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: CartService.deleteCartItem,
  });
  // handle func
  const handleDeleteCartItem = async (cartItemId) => {
    try {
      if (cartItemId) {
        await deleteMutation.mutateAsync(cartItemId);
      }
    } catch (error) {}
  };
  const handlePlus = async (cartId, cartItemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    try {
      if (cartId && cartItemId) {
        await quantityMutation.mutateAsync({
          cartId,
          cartItemId,
          quantity: newQuantity,
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleMinus = async (cartId, cartItemId, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity > 0) {
      try {
        if (cartId && cartItemId) {
          await quantityMutation.mutateAsync({
            cartId,
            cartItemId,
            quantity: newQuantity,
          });
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };
  useEffect(() => {
    document.title = "Cart";
    if (cartData) {
      setCartList(cartData.cartItems);
    }
  }, [cartData]);
  // format
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  // calculator
  const calculateTotalPrice = () => {
    return cartList.reduce((total, item) => {
      return total + item.product.unitPrice * item.quantity;
    }, 0);
  };
  return (
    <div className="cart-container">
      <Navbar />
      <Settingnav />
      <div className="cart">
        <div className="cart-main">
          {cartList.map((item) => (
            <div key={item.product.productId} className="cart-item">
              <i
                className="bx bxs-trash-alt"
                onClick={() => handleDeleteCartItem(item.cartItemId)}
              ></i>
              <img src={item.product.image} alt="" />
              <div className="cart-item-info">
                <h2>{item.product.productName}</h2>
                <strong>{formatPrice(item.product.unitPrice)}</strong>
                <div>
                  <p
                    onClick={() =>
                      handlePlus(
                        cartData.cartId,
                        item.cartItemId,
                        item.quantity
                      )
                    }
                  >
                    +
                  </p>
                  <p>{item.quantity}</p>
                  <p
                    onClick={() =>
                      handleMinus(
                        cartData.cartId,
                        item.cartItemId,
                        item.quantity
                      )
                    }
                  >
                    -
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <div className="checkout-info">
            {cartList.map((item) => (
              <div key={item.product.productId} className="checkout-info-item">
                <p>
                  {item.product.productName} (x{item.quantity})
                </p>
                <p>{formatPrice(item.product.unitPrice)}</p>
              </div>
            ))}
          </div>
          <div className="total">
            <strong>Total</strong>
            <strong>{formatPrice(calculateTotalPrice())}</strong>
          </div>
          <Link to="/checkout">PROCEED TO CHECKOUT</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
