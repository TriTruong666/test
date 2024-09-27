import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as BlogService from "../../../service/blog/blogService";
import "../../../styles/dashboard/adminblogdetail/adminblogdetail.css";

export const AdminBlogDetail = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const { blogId } = useParams();

  const {
    data: blog = {}, // Provide a default value to avoid undefined issues
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => BlogService.detailBlogService(blogId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setIsLoadingPage(isFetching || isLoading);
  }, [isFetching, isLoading]);

  if (isLoadingPage) {
    return (
      <div className="loading">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    );
  }

  if (isError) {
    return <p>Error loading blog details. Please try again later.</p>;
  }

  // Check if the blog object exists and has valid properties before rendering them
  if (!blog || Object.keys(blog).length === 0) {
    return <p>No blog details available.</p>;
  }

  return (
    <div className="admin-blog-detail-container">
      <div className="admin-blog-detail-header">
        <strong>My Blog Detail {blog.blogId || "N/A"} </strong>
        <div>
          <i className="bx bx-edit-alt"></i>
          <i className="bx bx-trash-alt"></i>
        </div>
      </div>
      <div className="admin-blog-preview-main">
        <div className="header">
          <strong>Preview</strong>
          <p>What users see when they visit your blog</p>
        </div>
        <div className="main">
          <div className="header">
            <strong>{blog.title || "Untitled Blog"}</strong>
            <p>{new Date(blog.createDate).toLocaleDateString() || "Date not available"}</p>
          </div>
          {blog.image ? (
            <img src={blog.image} alt={blog.title || "Blog Image"} />
          ) : (
            <p>No image available</p>
          )}
          <div className="blog-detail-main">
            <div className="share">
              <strong>Share Article</strong>
              <div>
                <i className="bx bx-link-alt"></i>
                <i className="bx bxl-facebook-circle"></i>
                <i className="bx bxl-instagram-alt"></i>
              </div>
            </div>
            <div className="blog-detail-content">
              <p>{blog.content || "No content available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
