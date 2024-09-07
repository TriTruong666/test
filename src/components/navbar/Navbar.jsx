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
        <a href="#about">What is Izumiya?</a>
        <Link to="shop">Shop</Link>
        <a href="#solution">Solutions</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Blog</a>
      </div>
      <div className="navbar-second">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};
