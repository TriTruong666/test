import axios from "axios";
export const getAllBlog = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8080/blog/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.result;
  } catch (error) {
    return error.response.data;
  }
};

export const createBlogService = async (blogData) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/blog/create";
    const res = await axios.post(api, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editBlog = async (blogId, updatedBlogData) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/blog/edit/${blogId}`;
    const res = await axios.put(api, updatedBlogData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}; 