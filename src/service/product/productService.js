import axios from "axios";
export const getAllProduct = async () => {
  try {
    const response = await axios.get("http://localhost:8080/product/list", {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const detailProductService = async (productId) => {
  try {
    const api = `http://localhost:8080/product/${productId}`;
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.result);
    return res.data.result;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
