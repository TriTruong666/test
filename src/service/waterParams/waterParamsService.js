import axios from "axios";

export const createWaterService = async (data) => {
  try {
    const api = "http://localhost:8080/water-param/create";
    const res = await axios.post(api, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
