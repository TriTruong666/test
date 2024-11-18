import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import styles
import "../../../styles/dashboard/myblog/myblog.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { MyBlogList } from "../../../components/myblog/MyBlogList";
import { AddBlog } from "../../../components/modal/AddBlog";
import { UpdateBlog } from "../../../components/modal/UpdateBlog";
import { DelBlog } from "../../../components/modal/DelBlog";
export const BlogManage = () => {
  //   selector
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
    <div className="blog-manage-container">
      <Dashnav />
      {isToggleUpdateBlogModal && <UpdateBlog />}
      {isToggleAddBlogModal && <AddBlog />}
      {isToggleDelBlogModal && <DelBlog />}
      <div className="blog-manage">
        <div className="blog-manage-header">
          <strong>My Blog</strong>
        </div>
        <MyBlogList />
      </div>
      <Outlet />
    </div>
  );
};
