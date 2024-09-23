import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/adminblog/adminblog.css";
export const AdminBlogList = () => {
  return (
    <div className="admin-blog-list">
      <Link to="/dashboard/admin/blog/detail">
        <strong>My Blog #123123</strong>
        <p>20 Aug 2020</p>
      </Link>
    </div>
  );
};
