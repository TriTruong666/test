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
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error(
      "Error creating blog:",
      error.response ? error.response.data : error
    ); // Log error details
    return error.response ? error.response.data : { error: "Network Error" };
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

export const detailBlogService = async (blogId) => {
  try {
    const api = `http://localhost:8080/blog/${blogId}`;
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.result)
    return res.data.result;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
