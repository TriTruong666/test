import React from "react";
// import styles
import "../../styles/blog/blog.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { Bloglist } from "../../components/blog/Bloglist";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
export const Blog = () => {
  return (
    <div className="blog-container">
      <Navbar />
      <Settingnav />
      <div className="blog">
        <div className="blog-header">
          <strong>BLOGS</strong>
          <p>Find out outstanding topics of Izumiya's community.</p>
        </div>
        <Bloglist />
      </div>
      <Footer />
    </div>
  );
};
