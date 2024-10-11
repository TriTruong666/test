import axios from "axios";

export const createInvoice = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/order/create/checkout";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
