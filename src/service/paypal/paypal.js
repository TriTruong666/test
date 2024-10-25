import axios from "axios";

export const createPayment = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/payment/create/checkout";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data && res.data.result && res.data.result.approval_url) {
      window.location.href = res.data.result.approval_url;
    }
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const buyNow = async (data) => {
  const token = localStorage.getItem("token");

  try {
    const api = "http://localhost:8080/payment/create/buy-now";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data && res.data.result && res.data.result.approval_url) {
      window.location.href = res.data.result.approval_url;
    }
    return res.data;
  } catch (error) {
    return error;
  }
};
