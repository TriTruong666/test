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
    return error.response.data;
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
    return error.response.data;
  }
};
export const successOrder = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/payment/capture";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const rejectOrder = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/payment/void";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const refundOrder = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/refund/create";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
