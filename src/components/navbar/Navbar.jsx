import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import styles
import "../../styles/components/navbar/navbar.css";
// import assets
import logo from "../../assets/logo.png";
// import dispatch
import { useDispatch } from "react-redux";
// import slices
import { toggleSettingNav } from "../../redux/slices/navbar/navbar";
export const Navbar = () => {
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleSettingnav = () => {
    dispatch(toggleSettingNav());
  };
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
      {/* before login */}
      {/* <div className="navbar-second">
        <i className="bx bxs-cart"></i>
        <i className="bx bx-cart"></i>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div> */}
      {/* afterlogin */}
      <div className="navbar-third" onClick={handleToggleSettingnav}>
        <strong>Truong Hoang Tri</strong>
        <i className="bx bx-chevron-down"></i>
      </div>
    </div>
  );
};
