import React, { useEffect, useState } from "react";
// import styles
import "../../styles/blog/blog.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { Bloglist } from "../../components/blog/Bloglist";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
export const Blog = () => {
  // state
  const [isAuth, setIsAuth] = useState(false);
  // handle func
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };
  useEffect(() => {
    handleSetIsAuth();
  }, []);
  return (
    <div className="blog-container">
      <Navbar />
      {isAuth && <Settingnav />}
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
