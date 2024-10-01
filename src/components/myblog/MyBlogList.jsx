import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/myblog/myblog.css";
// import service
import * as BlogService from "../../service/blog/blogService";
export const MyBlogList = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.userId;
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  // query
  const {
    data: blogs = [],
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["myBlogs", userId],
    queryFn: async () => BlogService.getUserBlogs(userId),
  });
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (blogs.length === 0) {
      setEmptyList("Product list is empty");
    } else {
      setEmptyList(null);
    }
  }, [isFetching, isLoading]);
  return (
    <div className="my-blog-list">
      {emptyList && (
        <div className="empty-list">
          <p>Your blogs is empty</p>
        </div>
      )}
      {isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={50} />
          </div>
        </>
      ) : (
        <>
          {blogs.map((blog) => (
            <>
              <Link
                key={blog && blog.blogId}
                to={`/dashboard/myblog/review/${blog.blogId}`}
              >
                <strong>{blog && blog.title}</strong>
                <p>Create at {blog && blog.createDate}</p>
              </Link>
            </>
          ))}
        </>
      )}
    </div>
  );
};
