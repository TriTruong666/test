import axios from "axios";
export const getAllProduct = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // If token doesn't exist
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await axios.get("http://localhost:8080/product/list", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to Authorization header
      },
    });
    console.log(response.data);
    return response.data.result;
  } catch (error) {
    return error.response.data;
  }
};
export const createProductService = async (productData) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/product/create";
    const res = await axios.post(api, productData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to Authorization header
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
