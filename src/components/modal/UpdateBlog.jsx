import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FileResizer from "react-image-file-resizer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { useEffect, useState } from "react";
import { toggleUpdateBlogModal } from "../../redux/slices/modal/modal";
// import service

import * as BlogService from "../../service/blog/blogService";
export const UpdateBlog = () => {
  // param
  const { blogId } = useParams();
  // dispatch
  const dispatch = useDispatch();
  // query
  const { data: blogInfo = {} } = useQuery({
    queryKey: ["blogDetail", blogId],
    queryFn: () => BlogService.detailBlogService(blogId),
  });
  // state
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const [submitData, setSubmitData] = useState({
    image: blogInfo.image,
    title: blogInfo.title,
    content: blogInfo.content,
  });

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
  useEffect(() => {
    if (blogInfo && blogInfo.image) {
      setPreviewImage(blogInfo.image);
    }
  }, [blogInfo.image]);
  //   file resizer
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

  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["updateBlog", blogId],
    mutationFn: (updateData) => {
      BlogService.updateBlogService(blogId, updateData);
    },
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: () => {
      toast.success("Update successfully", {
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
      }, 1500);
      queryCilent.invalidateQueries({
        queryKey: ["update-blog"],
      });
    },
  });
  //   handle func
  const removeChooseImage = () => {
    setPreviewImage(null);
    setSubmitData({
      ...submitData,
      image: "",
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubmitData({
      ...submitData,
      [name]: value,
    });
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
    if (!submitData.content || !submitData.image || !submitData.title) {
      toast.error("Please input all fields", {
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
      await mutation.mutateAsync(submitData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleUpdatePondModal = () => {
    dispatch(toggleUpdateBlogModal());
  };
  return (
    <div className="update-blog-container">
      <ToastContainer />
      <div className="update-blog-modal">
        <div className="update-blog-header">
          <strong>Update Blog</strong>
          <i className="bx bx-x" onClick={handleToggleUpdatePondModal}></i>
        </div>
        <form action="" onSubmit={handleSubmit} className="update-blog-form">
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
              src=""
              alt=""
              onChange={(e) => resizeFile(e.target.files[0])}
            />
          </div>

          <div className="input-item">
            <label htmlFor="title">Blog title</label>
            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              defaultValue={submitData.title}
              placeholder="Enter blog title"
            />
          </div>
          <div className="input-item">
            <label htmlFor="blog-content">Blog Content</label>
            <ReactQuill
              theme="snow"
              value={submitData.content}
              onChange={(content) => setSubmitData({ ...submitData, content })}
              modules={quillModules}
              placeholder="Write your blog content here..."
            />
          </div>

          <div className="submit">
            <button onClick={handleToggleUpdatePondModal}>Cancel</button>
            <button>Update confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
