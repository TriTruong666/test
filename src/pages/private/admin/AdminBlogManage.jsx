import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// import styles
import "../../../styles/dashboard/adminblog/adminblog.css";
// import component
import { AdminBlogList } from "../../../components/adminblog/AdminBlogList";
import { AddBlog } from "../../../components/modal/AddBlog";
import { DelBlog } from "../../../components/modal/DelBlog";
import { UpdateBlog } from "../../../components/modal/UpdateBlog";
import { Dashnav } from "../../../components/navbar/Dashnav";
// import slices
import { toggleAddBlogModal } from "../../../redux/slices/modal/modal";

export const AdminBlogManage = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const isToggleAddBlogModal = useSelector(
    (state) => state.modal.addBlogModal.isToggleModal
  );
  const isToggleUpdateBlogModal = useSelector(
    (state) => state.modal.updateBlogModal.isToggleModal
  );
  const isToggleDelBlogModal = useSelector(
    (state) => state.modal.deleteBlogModal.isToggleModal
  );

  // New state for filter
  const [filterOption, setFilterOption] = useState("default");

  // handle func
  const handleToggleAddBlogModal = () => {
    dispatch(toggleAddBlogModal());
  };

  // New function to handle filter change
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <div className="admin-blog-container">
      <Dashnav />
      {isToggleAddBlogModal && <AddBlog />}
      {isToggleUpdateBlogModal && <UpdateBlog />}
      {isToggleDelBlogModal && <DelBlog />}
      <div className="admin-blog">
        <div className="admin-blog-header">
          <strong>My Blog</strong>
        </div>
        <div className="admin-blog-utils">
          <div className="filter">
            <select name="filter" id="filter" value={filterOption} onChange={handleFilterChange}>
              <option value="default">Filter</option>
              <option value="date">By Date</option>
              <option value="blogName">By Blog Name</option>
              <option value="author">By Author</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div>
          <div className="add" onClick={handleToggleAddBlogModal}>
            <i className="bx bx-plus"></i>
            <p>Create new blog</p>
          </div>
        </div>
        <AdminBlogList filterOption={filterOption} />
      </div>
      <Outlet />
    </div>
  );
};