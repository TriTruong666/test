import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/blog/blog.css";
// import assets
import blogImg from "../../assets/blogheader.jpg";

// import API

import { useQuery } from "@tanstack/react-query";
import * as BlogService from "../../service/blog/blogService";

export const Bloglist = () => {

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
    <div className="bloglist-container">
      {blogs.map((blog) =>(
        <div className="blog-item" key={blog.blogId}>
        <img src={blog.image} alt="" />
        <small>{blog.createDate}</small>
        <Link to={`/blogdetail/${blog.blogId}`}>
         {blog.title}
        </Link>
        <p>
          {blog.content}
        </p>
        <span>By Admin</span>
      </div>
      )) }
      <div className="blog-item">
        <img src={blogImg} alt="" />
        <small>30 Jan 2024</small>
        <Link to="/blogdetail">
          Famous Japanese Temples, Shrines, and Koi Pond Gardens
        </Link>
        <p>
          Japanese shrines and temples hold a significant place in the cultural
          and historical tapestry of Japan. They serve as sanctuaries of
          spirituality, cultural preservation, and natural beauty. These sacred
          sites, steeped in centuries-old traditions, offer a serene escape...
        </p>
        <span>By Admin</span>
      </div>
      <div className="blog-item">
        <img src={blogImg} alt="" />
        <small>30 Jan 2024</small>
        <Link to="/blogdetail">
          Famous Japanese Temples, Shrines, and Koi Pond Gardens
        </Link>
        <p>
          Japanese shrines and temples hold a significant place in the cultural
          and historical tapestry of Japan. They serve as sanctuaries of
          spirituality, cultural preservation, and natural beauty. These sacred
          sites, steeped in centuries-old traditions, offer a serene escape...
        </p>
        <span>By Admin</span>
      </div>
      <div className="blog-item">
        <img src={blogImg} alt="" />
        <small>30 Jan 2024</small>
        <Link to="/blogdetail">
          Famous Japanese Temples, Shrines, and Koi Pond Gardens
        </Link>
        <p>
          Japanese shrines and temples hold a significant place in the cultural
          and historical tapestry of Japan. They serve as sanctuaries of
          spirituality, cultural preservation, and natural beauty. These sacred
          sites, steeped in centuries-old traditions, offer a serene escape...
        </p>
        <span>By Admin</span>
      </div>
      <div className="blog-item">
        <img src={blogImg} alt="" />
        <small>30 Jan 2024</small>
        <Link to="/blogdetail">
          Famous Japanese Temples, Shrines, and Koi Pond Gardens
        </Link>
        <p>
          Japanese shrines and temples hold a significant place in the cultural
          and historical tapestry of Japan. They serve as sanctuaries of
          spirituality, cultural preservation, and natural beauty. These sacred
          sites, steeped in centuries-old traditions, offer a serene escape...
        </p>
        <span>By Admin</span>
      </div>
    </div>
  );
};
