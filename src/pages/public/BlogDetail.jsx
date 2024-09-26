import React, { useEffect, useState } from "react";
// import styles
import "../../styles/blogdetail/blogdetail.css";
// import components
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
// import API
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as BlogService from "../../service/blog/blogService";

const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
export const BlogDetail = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const { blogId } = useParams();
  //const numericBlogId = parseInt(blogId);
  const {
    data: blog,
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
    } else {
      setIsLoadingPage(false);
    }
  }, [isFetching]);

  return (
    <div className="blog-detail-container">
      <Navbar />
      <Settingnav />
      <div className="blog-detail">
        {isLoadingPage ? (
          <div className="loading">
            <ClipLoader color="#ffffff" size={50} />
          </div>
        ) : (
          <>
            <div className="blog-detail-header">
              <strong>{blog && blog.title}</strong>
              <p>
                {blog && blog.createDate} - By {blog && blog.fullname}
              </p>
            </div>
            <img src={blog && blog.image} alt="" />
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
                <p>{blog && blog.content}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
