import React from "react";
// import styles
import "../../styles/blogdetail/blogdetail.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
import blogImg from "../../assets/blogheader.jpg";
export const BlogDetail = () => {
  return (
    <div className="blog-detail-container">
      <Navbar />
      <Settingnav />
      <div className="blog-detail">
        <div className="blog-detail-header">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};
