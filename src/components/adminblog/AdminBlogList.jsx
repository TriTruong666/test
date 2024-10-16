import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/adminblog/adminblog.css";

// import API
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import * as BlogService from "../../service/blog/blogService";

export const AdminBlogList = ({ filterOption }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const ownUserId = user.userId;
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const {
    data: blogs = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["adminBlogs"],
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
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isError, isLoading, isFetching, blogs.length]);

  useEffect(() => {
    let sortedBlogs = [...blogs];
    switch (filterOption) {
      case "date":
        sortedBlogs.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        break;
      case "blogName":
        sortedBlogs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        sortedBlogs.sort((a, b) => a.fullname.localeCompare(b.fullname));
        break;
      default:
        // No sorting for default option
        break;
    }
    setFilteredBlogs(sortedBlogs);
  }, [filterOption, blogs]);

  return (
    <div className="admin-blog-list">
      {serverError ? (
        <div className="error-page">
          <p>{serverError}</p>
        </div>
      ) : isLoadingPage ? (
        <div className="loading">
          <ClipLoader color="#000000" size={40} />
        </div>
      ) : (
        <>
          {emptyList && (
            <div className="empty-list">
              <p>{emptyList}</p>
            </div>
          )}
          {filteredBlogs.map((blog) => (
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