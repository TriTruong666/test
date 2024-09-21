import React from "react";
import { useDispatch } from "react-redux";
// import styles
import "../../../styles/dashboard/myblogdetail/myblogdetail.css";
// import components

// import assets
import image from "../../../assets/blogheader.jpg";
// import slices
import { toggleUpdateBlogModal } from "../../../redux/slices/modal/modal";
export const BlogDetail = () => {
  // dispatch
  const dispatch = useDispatch();
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdateBlogModal());
  };
  return (
    <div className="my-blog-detail-container">
      <div className="my-blog-detail-header">
        <strong>My Blog Detail #123124</strong>
        <div>
          <i
            className="bx bx-edit-alt"
            onClick={handleToggleUpdatePondModal}
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
            <strong>
              Famous Japanese Temples, Shrines, and Koi Pond Gardens
            </strong>
            <p>30 Jan 2024 - By Admin</p>
          </div>
          <img src={image} alt="" />
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
                quisquam laudantium. Quibusdam perspiciatis accusantium aut?
                orem ipsum dolor sit, amet consectetur adipisicing elit.
                Excepturi fugiat similique magni dicta placeat eum facilis saepe
                aliquid consectetur dolore, maxime, non reprehenderit unde,
                quisquam laudantium. Quibusdam perspiciatis accusantium aut?
                orem ipsum dolor sit, amet consectetur adipisicing elit.
                Excepturi fugiat similique magni dicta placeat eum facilis saepe
                aliquid consectetur dolore, maxime, non reprehenderit unde,
                quisquam laudantium. Quibusdam perspiciatis accusantium aut?
                orem ipsum dolor sit, amet consectetur adipisicing elit.
                Excepturi fugiat similique magni dicta placeat eum facilis saepe
                aliquid consectetur dolore, maxime, non reprehenderit unde,
                quisquam laudantium. Quibusdam perspiciatis accusantium aut?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
