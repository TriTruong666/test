import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import styles
import "../../styles/blog/blog.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { Bloglist } from "../../components/blog/Bloglist";
import { Settingnav } from "../../components/navbar/Settingnav";
// import service
import * as BlogService from "../../service/blog/blogService";

export const Blog = () => {
  // state
  const [isAuth, setIsAuth] = useState(false);
  const [infinityScroll, setInfinityScroll] = useState(6);
  const [endBlog, setEndBlog] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAllBlog,
    refetchOnWindowFocus: false,
  });
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
  // handle func
  const handlePagination = () => {
    if (infinityScroll < blogs.length) {
      setIsLoadingList(true); // Start loading
      setTimeout(() => {
        setInfinityScroll(infinityScroll + 6);
        setIsLoadingList(false);
      }, 1000);
    }
  };
  useEffect(() => {
    handleSetIsAuth();

    // Check if we've loaded all blogs
    if (blogs.length > 0 && infinityScroll >= blogs.length) {
      setEndBlog("You have reached the last blog");
    } else {
      setEndBlog(null);
    }
  }, [blogs, infinityScroll]);
  return (
    <div className="blog-container">
      <Navbar />
      {isAuth && <Settingnav />}
      <div className="blog">
        <div className="blog-header">
          <strong>BLOGS</strong>
          <p>Find out outstanding topics of Izumiya's community.</p>
        </div>
        <Bloglist
          infinityScroll={infinityScroll}
          isLoadingList={isLoadingList}
        />
        {endBlog ? (
          <>
            <div className="end-blog">
              <p>{endBlog}</p>
            </div>
          </>
        ) : (
          <>
            <div className="infinity-scroll">
              <strong onClick={handlePagination}>Load more blogs...</strong>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
