import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import styles
import "../../styles/components/navbar/navbar.css";
// import assets
import logo from "../../assets/logo.png";
// import dispatch
import { useDispatch } from "react-redux";
// import slices
import { toggleSettingNav } from "../../redux/slices/navbar/navbar";
// import service
import * as CartService from "../../service/cart/cartService";
export const Navbar = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  // state
  const [isEmptyCart, setIsEmptyCart] = useState(false);
  // query
  const { data: cartInfo = {} } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
  });
  const [isAuth, setIsAuth] = useState(false);
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleSettingnav = () => {
    dispatch(toggleSettingNav());
  };

  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };
  useEffect(() => {
    handleSetIsAuth();
    if (cartInfo && cartInfo.cartItems && cartInfo.cartItems.length === 0) {
      setIsEmptyCart(true);
    } else {
      setIsEmptyCart(false);
    }
  }, [cartInfo]);
  return (
    <div className="navbar-container">
      <div className="navbar-main">
        <img src={logo} alt="" onClick={() => navigate("/")} />
        <Link to="/#about">What Is Izumiya?</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/#solution">Solutions</Link>
        <a href="">About</a>
        <a href="">Contact</a>
        <Link to="/blog">Blog</Link>
      </div>
      {isAuth ? (
        <div className="navbar-third">
          {isEmptyCart ? (
            <>
              <Link to="/cart">
                <i className="bx bx-cart"></i>
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart">
                <i className="bx bxs-cart"></i>
                <p>
                  {cartInfo && cartInfo.cartItems && cartInfo.cartItems.length}
                </p>
              </Link>
            </>
          )}
          <div className="info" onClick={handleToggleSettingnav}>
            <strong>{user.fullname}</strong>
            <i className="bx bx-chevron-down"></i>
          </div>
        </div>
      ) : (
        <div className="navbar-second">
          <Link to="/cart">
            <i className="bx bx-cart"></i>
          </Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};
