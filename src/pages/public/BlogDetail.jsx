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
    data: blog = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => BlogService.detailBlogService(blogId),
    refetchOnWindowFocus: false,
  });
  const plainTextDescription = stripHtmlTags(blog.content);
  useEffect(() => {
    document.title = blog.title;
    if (isFetching) {
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
        {/* <div className="blog-detail-header">
          <strong>
            Famous Japanese Temples, Shrines, and Koi Pond Gardens
          </strong>
          <p>30 Jan 2024 - By Admin</p>
        </div>
        <img src={blogImg} alt="" />
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
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Excepturi fugiat similique magni dicta placeat eum facilis saepe
              aliquid consectetur dolore, maxime, non reprehenderit unde,
              quisquam laudantium. Quibusdam perspiciatis accusantium aut? orem
              ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
              fugiat similique magni dicta placeat eum facilis saepe aliquid
              consectetur dolore, maxime, non reprehenderit unde, quisquam
              laudantium. Quibusdam perspiciatis accusantium aut? orem ipsum
              dolor sit, amet consectetur adipisicing elit. Excepturi fugiat
              similique magni dicta placeat eum facilis saepe aliquid
              consectetur dolore, maxime, non reprehenderit unde, quisquam
              laudantium. Quibusdam perspiciatis accusantium aut? orem ipsum
              dolor sit, amet consectetur adipisicing elit. Excepturi fugiat
              similique magni dicta placeat eum facilis saepe aliquid
              consectetur dolore, maxime, non reprehenderit unde, quisquam
              laudantium. Quibusdam perspiciatis accusantium aut?
            </p>
          </div>
        </div> */}


{isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : (
            <>
             <div className="blog-detail-header">
          <strong>
           {blog.title}
          </strong>
          <p>{blog.createDate} - By Admin</p>
        </div>
        <img src={blog.image} alt="" />
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
            <p>
             {plainTextDescription}
            </p>
          </div>
        </div>
            </>
          )}
      </div>
      <Footer />
    </div>
  );
};
