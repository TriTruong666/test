import React from "react";
import { Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/adminblog/adminblog.css";
// import component
import { Dashnav } from "../../../components/navbar/Dashnav";
import { AdminBlogList } from "../../../components/adminblog/AdminBlogList";
export const AdminBlogManage = () => {
  return (
    <div className="admin-blog-container">
      <Dashnav />
      <div className="admin-blog">
        <div className="admin-blog-header">
          <strong>My Blog</strong>
        </div>
        <div className="admin-blog-utils">
          {/* <div className="filter">
            <select name="" id="">
              <option value="">Filter</option>
              <option value="">By Date</option>
              <option value="">By Price</option>
              <option value="">By Number of Items</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div> */}
          <div className="add">
            <i className="bx bx-plus"></i>
            <p>Create new blog</p>
          </div>
        </div>
        <AdminBlogList />
      </div>
      {/* <div className="admin-blog-empty">
        <strong>No order was selected</strong>
        <p>You can click to a order to see detail</p>
      </div> */}
      <Outlet />
    </div>
  );
};
