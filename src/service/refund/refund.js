import axios from "axios";

export const getAllRefundRequest = async () => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/refund/get-all-refund-requests";
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    return error.response.data;
  }
};
export const getRefundRequestDetail = async (refundId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/refund/${refundId}`;
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    return error.response.data;
  }
};
export const createRefundRequest = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/refund/create";
    const res = await axios.post(api, data, {
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
export const approvedRefund = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/refund/approved";
    const res = await axios.post(api, data, {
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
export const rejectedRefund = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/refund/rejected";
    const res = await axios.post(api, data, {
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
