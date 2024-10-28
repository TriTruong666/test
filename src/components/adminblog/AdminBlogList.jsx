import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/adminblog/adminblog.css";

import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
// import service
import * as BlogService from "../../service/blog/blogService";
import { useDispatch } from "react-redux";
import { toggleAddBlogModal } from "../../redux/slices/modal/modal";

export const AdminBlogList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const ownUserId = user.userId;
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // dispatch
  const dispatch = useDispatch();
  const {
    data: blogs = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["adminBlogs"],
    queryFn: BlogService.getAllBlog,
  });
  // handle func
  const handleToggleAddBlogModal = () => {
    dispatch(toggleAddBlogModal());
  };
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isError, isLoading, isFetching, blogs.length]);
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="admin-blog-utils">
        <div className="search-blog">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Search blog by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>
        <div className="add" onClick={handleToggleAddBlogModal}>
          <i className="bx bx-plus"></i>
          <p>Create new blog</p>
        </div>
      </div>
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
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
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
              ))
            ) : (
              <div className="empty-list">
                <p>No blogs was found</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
