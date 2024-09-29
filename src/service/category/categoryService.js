import axios from "axios";

export const getAllCategoryService = async () => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/category/list"
    const response = await axios.get(api, {
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



export const detailPondService = async (categoryId) => {
  try {
    const api = `http://localhost:8080/category/${categoryId}`;
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    return error.response.data;
  }
};
