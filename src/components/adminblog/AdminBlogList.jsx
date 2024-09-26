import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/adminblog/adminblog.css";


// import API
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import * as BlogService from "../../service/blog/blogService";
export const AdminBlogList = () => {
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
    <div className="admin-blog-list">
      {isLoading || isLoadingPage ? (
        <div className="loading">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      ) : (
        <>
          {blogs.map((blog) => (
            <Link key={blog.blogId} to={`/dashboard/admin/blog/detail/${blog.blogId}`}>
              <strong>{blog.title}</strong>
              <p>{blog.createDate}</p>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
