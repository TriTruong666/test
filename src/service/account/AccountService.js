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
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
