import axios from "axios";




export const createPondService = async (pondData) => {
  const token = localStorage.getItem("token");
  try {
    const api = "http://localhost:8080/pond/create";
    const res = await axios.post(api, pondData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};




export const getAllPondService = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8080/pond/list", {
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

export const getUserPondService = async (userId) =>{
  try {
    const api = `http://localhost:8080/user/${userId}`;
    const res = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    return error.response.data;
  }
}




export const detailPondService = async (pondId) => {
  try {
    const api = `http://localhost:8080/pond/${pondId}`;
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




export const deletePondService = async (pondId) => {
  try {
    const api = `http://localhost:8080/pond/delete/${pondId}`;
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



export const updatePondService = async (pondId) => {
  try {
    const api = `http://localhost:8080/pond/update/${pondId}`;
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
