import axios from "axios";

export const signupService = async (userData) => {
  try {
    const api = "http://localhost:8080/users/sign-up";
    const res = await axios.post(api, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginService = async (userData) => {
  try {
    const api = "http://localhost:8080/auth/sign-in";
    const res = await axios.post(api, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("token", res.data.result.token);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const verifyToken = async (token) => {
  try {
    const api = " http://localhost:8080/auth/introspect";
    const res = await axios.post(api, token, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
