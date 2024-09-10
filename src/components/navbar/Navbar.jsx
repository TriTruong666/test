import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/navbar/navbar.css";
// import assets
import logo from "../../assets/logo.png";
export const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-main">
        <img src={logo} alt="" />
        <Link to="/#about">What Is Izumiya?</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/#solution">Solutions</Link>
        <a href="">About</a>
        <a href="">Contact</a>
        <Link to="/blog">Blog</Link>
      </div>
      <div className="navbar-second">
        <i className="bx bx-cart"></i>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};
