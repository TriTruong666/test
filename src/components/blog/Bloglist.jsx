import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/blog/blog.css";

// import API
import { useQuery } from "@tanstack/react-query";
import * as BlogService from "../../service/blog/blogService";

export const Bloglist = ({ infinityScroll, isLoadingList }) => {
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
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
  }, [isLoading, isFetching]);

  return (
    <div className="bloglist-container">
      {isLoadingPage || isLoadingList ? (
        <div className="loading">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      ) : isError ? (
        <div className="error-message">
          <p>Failed to load blogs. Please try again later.</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="empty-list-message">
          <p>No blogs available at the moment. Check back later!</p>
        </div>
      ) : (
        blogs.slice(0, infinityScroll).map((blog) => (
          <Link
            to={`/blogdetail/${blog.blogId}`}
            className="blog-item"
            key={blog.blogId}
          >
            <img src={blog.image} alt={blog.title} />
            <small>Created at {blog.createDate}</small>
            <strong>{blog.title}</strong>
            <span>By {blog.fullname}</span>
          </Link>
        ))
      )}
    </div>
  );
};
