import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../../styles/dashboard/myblogdetail/myblogdetail.css";
// import assets
import image from "../../../assets/blogheader.jpg";
// import slices
import { toggleUpdateBlogModal } from "../../../redux/slices/modal/modal";
// import service
import * as BlogService from "../../../service/blog/blogService";
const stripHtmlTags = (html) => {
  const allowedTags = ["strong", "em", "b", "i", "u", "br", "h2", "h3"];
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
export const BlogDetail = () => {
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  // param
  const { blogId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  const handleToggleUpdateBlogModal = () => {
    dispatch(toggleUpdateBlogModal());
  };
  // query
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
  return (
    <div className="my-blog-detail-container">
      {isLoadingPage ? (
        <>
          <div className="loading">
            <ClipLoader color="#000000" size={50} />
          </div>
        </>
      ) : (
        <>
          <div className="my-blog-detail-header">
            <strong>My Blog #{blog.blogId || "N/A"}</strong>
            <div>
              <i
                className="bx bx-edit-alt"
                onClick={handleToggleUpdateBlogModal}
              ></i>
              <i className="bx bx-trash-alt"></i>
            </div>
          </div>
          <div className="my-blog-preview-main">
            <div className="header">
              <strong>Preview</strong>
              <p>What user see when they visit your blog</p>
            </div>
            <div className="main">
              <div className="header">
                <strong>{blog.title || "Untitled Blog"}</strong>
                <p>
                  {new Date(blog.createDate).toLocaleDateString() ||
                    "Date not available"}
                </p>
              </div>
              <img src={blog.image || ""} alt="" />
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
