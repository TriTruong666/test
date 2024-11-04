import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import FileResizer from "react-image-file-resizer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleAddBlogModal } from "../../redux/slices/modal/modal";
import * as BlogService from "../../service/blog/blogService";
import "../../styles/components/modal/modal.css";

export const AddBlog = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [isValidName, setIsValidName] = useState(false);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const [submitData, setSubmitData] = useState({
    userId: userId,
    image: "",
    title: "",
    content: "",
  });

  // Quill modules for toolbar customization
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        [{ align: [] }],
        ["clean"],
      ],
    },
  };

  // File Resizer
  const resizeFile = (file) => {
    FileResizer.imageFileResizer(
      file,
      300,
      300,
      "PNG",
      100,
      0,
      (uri) => {
        setPreviewImage(uri);
        setSubmitData({
          ...submitData,
          image: uri,
        });
      },
      "base64",
      250,
      250
    );
  };

  // Mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: BlogService.createBlogService,
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: () => {
      toast.success("Create successfully", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
      queryClient.invalidateQueries({
        queryKey: ["myBlogs", "adminBlogs"],
      });
    },
  });

  // Handlers
  const handleOnChangeName = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value) || value.length < 10) {
      setSubmitData({
        ...submitData,
        [name]: "",
      });
      setIsValidName(true);
    } else {
      setSubmitData({
        ...submitData,
        [name]: value,
      });
      setIsValidName(false);
    }
  };

  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      image: "",
    });
  };

  const handleToggleAddPondModal = () => {
    dispatch(toggleAddBlogModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPreventSubmit) {
      toast.error("On-going process, try again later", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }
    if (isValidName) {
      toast.error(
        "Blog title must be at least 10 characters and not a number",
        {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        }
      );
      return;
    }
    if (!submitData.content || !submitData.title || !submitData.image) {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      return;
    }
    try {
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(submitData);
  }, [submitData]);

  return (
    <div className="add-blog-container">
      <ToastContainer />
      <div className="add-blog-modal">
        <div className="add-blog-header">
          <strong>Add Blog</strong>
          <i className="bx bx-x" onClick={handleToggleAddPondModal}></i>
        </div>
        <form onSubmit={handleSubmit} className="add-blog-form">
          <div className="input-image">
            <i className="bx bx-trash-alt" onClick={removeChooseImage}></i>
            {previewImage ? (
              <label htmlFor="img">
                <img src={previewImage} alt="" />
              </label>
            ) : (
              <label htmlFor="img">
                <i className="bx bx-image-add"></i>
                <p>Choose An Image</p>
              </label>
            )}
            <input
              type="file"
              id="img"
              onChange={(e) => resizeFile(e.target.files[0])}
            />
          </div>
          <div className="input-item">
            <label htmlFor="title"> Blog Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter blog title"
              onChange={handleOnChangeName}
            />
          </div>
          <div className="input-item">
            <label>Blog Content</label>
            <ReactQuill
              theme="snow"
              value={submitData.content}
              onChange={(content) => setSubmitData({ ...submitData, content })}
              modules={quillModules}
              placeholder="Write your blog content here..."
            />
          </div>
          <div className="submit">
            <button onClick={handleToggleAddPondModal}>Cancel</button>
            <button type="submit">Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
