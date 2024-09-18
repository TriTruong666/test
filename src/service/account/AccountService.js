import axios from "axios";

export const signupService = async (userData) => {
  try {
    // const api = "http://localhost:8080/api/v1/auth/signup";
    const envTest = import.meta.env.VITE_AUTH_API_URL + "/signup";
    const res = await axios.post(envTest, userData);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
