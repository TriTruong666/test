import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import styles
import "../../styles/components/modal/modal.css";
// import redux
import { useDispatch } from "react-redux";
// import slices
import { toggleDeleteBlogModal } from "../../redux/slices/modal/modal";
// import service
import * as BlogService from "../../service/blog/blogService";
export const DelBlog = () => {
  // param
  const { blogId } = useParams();
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["del-blog", blogId],
    mutationFn: BlogService.deleteBlogService,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: () => {
      toast.success("Delete successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        location.reload();
        setIsPreventSubmit(false);
      }, 1500);
    },
  });
  //   handle func
  const handleToggleDelBlogModal = () => {
    dispatch(toggleDeleteBlogModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPreventSubmit) {
      toast.error("On going process, try again later", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      await mutation.mutateAsync(blogId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="del-blog-containter">
      <ToastContainer />
      <div className="del-blog-modal">
        <div className="del-blog-header">
          <strong>Delete Blog</strong>
          <i className="bx bx-x" onClick={handleToggleDelBlogModal}></i>
        </div>
        <div className="del-blog-main">
          <p>Are you sure to delete Blog #{blogId}</p>
        </div>
        <div className="submit" onClick={handleSubmit}>
          <button>Delete Confirm</button>
        </div>
      </div>
    </div>
  );
};
