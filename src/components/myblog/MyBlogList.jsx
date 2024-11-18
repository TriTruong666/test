import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/myblog/myblog.css";
// import service
import * as BlogService from "../../service/blog/blogService";
import { useDispatch } from "react-redux";
import { toggleAddBlogModal } from "../../redux/slices/modal/modal";

export const MyBlogList = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.userId;

  // dispatch
  const dispatch = useDispatch();

  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // query
  const {
    data: blogs = [],
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["myBlogs", userId],
    queryFn: async () => BlogService.getUserBlogs(userId),
  });

  // handle func
  const handleToggleAddPondModal = () => {
    dispatch(toggleAddBlogModal());
  };

  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isFetching, isLoading, isError]);

  // Filtered blogs based on search term
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="blog-manage-utils">
        <div className="search-blog">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Search blog by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>
        <div className="add" onClick={handleToggleAddPondModal}>
          <i className="bx bx-plus"></i>
          <p>Create new blog</p>
        </div>
      </div>
      <div className="my-blog-list">
        {serverError ? (
          <div className="error-page">
            <p>{serverError}</p>
          </div>
        ) : isLoadingPage ? (
          <div className="loading">
            <ClipLoader color="#000000" size={50} />
          </div>
        ) : (
          <>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <Link
                  key={blog.blogId}
                  to={`/dashboard/myblog/review/${blog.blogId}`}
                >
                  <strong>{blog.title}</strong>
                  <p>Created at {blog.createDate}</p>
                </Link>
              ))
            ) : (
              <div className="empty-list">
                <p>No blogs were found</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
