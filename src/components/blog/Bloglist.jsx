import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/blog/blog.css";

// import API
import { useQuery } from "@tanstack/react-query";
import * as BlogService from "../../service/blog/blogService";

export const Bloglist = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const {
    data: blogs = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAllBlog,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
  }, [isLoading, isFetching]);

  if (isError) {
    return <p>Error fetching blogs. Please try again later.</p>;
  }

  return (
    <div className="bloglist-container">
      {isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#ffffff" size={50} />
          </div>
        </>
      ) : (
        <>
          {blogs.map((blog) => (
            <div className="blog-item" key={blog.blogId}>
              <img src={blog.image} alt="" />
              <small>{blog.createDate}</small>
              <Link to={`/blogdetail/${blog.blogId}`}>{blog.title}</Link>
              <p>{blog.content}</p>
              <span>By {blog.fullname}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
