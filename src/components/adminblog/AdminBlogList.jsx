import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/adminblog/adminblog.css";

// import API
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import * as BlogService from "../../service/blog/blogService";
export const AdminBlogList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const ownUserId = user.userId;
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const {
    data: blogs = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAllBlog,
  });
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (blogs.length === 0) {
      setEmptyList("Blog list is empty");
    } else {
      setEmptyList(null);
    }
  }, [isLoading, isFetching]);

  return (
    <div className="admin-blog-list">
      {emptyList && (
        <div className="empty-list">
          <p>{emptyList}</p>
        </div>
      )}
      {isLoading || isLoadingPage ? (
        <div className="loading">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      ) : (
        <>
          {blogs.map((blog) => (
            <Link
              key={blog.blogId}
              to={`/dashboard/admin/blog/detail/${blog.blogId}`}
            >
              <div>
                <strong>{blog.title}</strong>
                <span>
                  by {blog.userId === ownUserId ? "Me" : blog.fullname}
                </span>
              </div>
              <p>Create at {blog.createDate}</p>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
