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
        <AdminBlogList />
      </div>
      <Outlet />
    </div>
  );
};
