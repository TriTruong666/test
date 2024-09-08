import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/blog/blog.css";
// import assets
import blogImg from "../../assets/blogheader.jpg";

export const Bloglist = () => {
  return (
    <div className="bloglist-container">
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
