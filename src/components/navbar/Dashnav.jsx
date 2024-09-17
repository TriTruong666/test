import React from "react";
import { NavLink, Link } from "react-router-dom";
// import styles
import "../../styles/components/navbar/navbar.css";
// import assets
import logo from "../../assets/logo.png";
export const Dashnav = () => {
  return (
    <div className="dashnav-container">
      <div className="dashnav">
        <div className="dashnav-header">
          <img src={logo} alt="" />
          <strong>Izumiya Koi</strong>
        </div>
        <div className="dashnav-list">
          {/* member */}
          <div className="dashnav-list-item">
            <div className="dashnav-list-item-header">
              <p>Menu</p>
            </div>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-home-alt"></i>
              <p>Home</p>
            </NavLink>
            <NavLink
              to="/dashboard/mypond"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-cylinder"></i>
              <p>Pond Management</p>
            </NavLink>
            <NavLink
              to="/dashboard/myorder"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-shopping-bag"></i>
              <p>Order</p>
            </NavLink>
            <NavLink
              to="/dashboard/myblog"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bxl-blogger"></i>
              <p>Blog</p>
            </NavLink>
          </div>
          {/* section admin */}
          <div className="dashnav-list-item">
            <div className="dashnav-list-item-header">
              <p>Admin</p>
            </div>
            <NavLink
              to="/dashboard/summary"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-home-alt"></i>
              <p>Summary</p>
            </NavLink>
            <NavLink
              to="/dashboard/account"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-cylinder"></i>
              <p>Account</p>
            </NavLink>
            <NavLink
              to="/dashboard/productmanage"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-package"></i>
              <p>Product</p>
            </NavLink>
            <NavLink
              to="/dashboard/admin/order"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-shopping-bag"></i>
              <p>Order</p>
            </NavLink>
            <NavLink
              to="/dashboard/blogmanage"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bxl-blogger"></i>
              <p>Blog</p>
            </NavLink>
            <NavLink
              to="/dashboard/recuitment"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-user-plus"></i>
              <p>Recuitment</p>
            </NavLink>
          </div>
          {/* section tool */}
          <div className="dashnav-list-item">
            <div className="dashnav-list-item-header">
              <p>Tools</p>
            </div>
            <NavLink
              to="/dashboard/setting"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-cog"></i>
              <p>Setting</p>
            </NavLink>
            <NavLink
              to="/dashboard/help"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="bx bx-help-circle"></i>
              <p>Get Help</p>
            </NavLink>
          </div>
          {/*  */}
          <Link className="logout" to="/">
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
