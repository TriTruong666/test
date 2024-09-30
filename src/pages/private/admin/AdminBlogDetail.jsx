import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as BlogService from "../../../service/blog/blogService";
import "../../../styles/dashboard/adminblogdetail/adminblogdetail.css";
const stripHtmlTags = (html) => {
  const allowedTags = ["strong", "em", "b", "i", "u", "br", "h2"];
  const doc = new DOMParser().parseFromString(html, "text/html");
  const elements = doc.body.querySelectorAll("*");

  elements.forEach((el) => {
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      // Replace unwanted tags with their content
      el.replaceWith(...el.childNodes);
    }
  });
  return doc.body.innerHTML;
};
export const AdminBlogDetail = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const { blogId } = useParams();

  const {
    data: blog = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => BlogService.detailBlogService(blogId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
      setTimeout(() => {
        setIsLoadingPage(false);
      }, 1500);
    }
  }, [isFetching, isLoading]);

  if (isError) {
    return <p>Error loading blog details. Please try again later.</p>;
  }

  return (
    <div className="admin-blog-detail-container">
      {isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={50} />
          </div>
        </>
      ) : (
        <>
          <div className="admin-blog-detail-header">
            <strong>Blog #{blog.blogId || "N/A"} </strong>
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
                <p>
                  {new Date(blog.createDate).toLocaleDateString() ||
                    "Date not available"}
                </p>
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
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        blog &&
                        stripHtmlTags(blog.content || "No content available"),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
