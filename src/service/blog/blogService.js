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
  const userId = "7015a1d7-c88c-47ba-9480-fc51be65317c"; 

  
  if (!userId) {
    console.error("Error: User ID not found in localStorage.");
    return { error: "User ID is missing" };
  }

  
  const payload = { ...blogData, userId };

  try {
    const api = "http://localhost:8080/blog/create";
    console.log("Creating blog with data:", payload); // Logging payload
    const res = await axios.post(api, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Blog created successfully:", res.data); // Log success
    return res.data;
  } catch (error) {
    console.error("Error creating blog:", error.response ? error.response.data : error); // Log error details
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
    return res.data.result;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
