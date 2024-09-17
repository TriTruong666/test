import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/myblog/myblog.css";
export const MyBlogList = () => {
  return (
    <div className="my-blog-list">
      <Link to="/dashboard/myblog/review">
        <strong>My Blog #123123</strong>
        <p>20 Aug 2020</p>
      </Link>
    </div>
  );
};
