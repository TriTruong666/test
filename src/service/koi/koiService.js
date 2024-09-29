import axios from "axios";

export const createKoiService = async (koiData) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/koi/create";
    const res = await axios.post(api, koiData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};



export const detailKoiService = async (koiId) => {
  try {
    const api = `http://localhost:8080/koi/${koiId}`;
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


export const deleteKoiService = async (koiId) => {
  try {
    const api = `http://localhost:8080/koi/delete/${koiId}`;
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


export const updateKoiService = async (koiId) => {
  try {
    const api = `http://localhost:8080/koi/update/${koiId}`;
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





