import React from "react";
import { Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/myblog/myblog.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { MyBlogList } from "../../../components/myblog/MyBlogList";
export const BlogManage = () => {
  return (
    <div className="blog-manage-container">
      <Dashnav />
      <div className="blog-manage">
        <div className="blog-manage-header">
          <strong>My Blog</strong>
        </div>
        <div className="blog-manage-utils">
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
        <MyBlogList />
      </div>
      {/* <div className="my-blog-empty">
        <strong>No order was selected</strong>
        <p>You can click to a order to see detail</p>
      </div> */}
      <Outlet />
    </div>
  );
};
