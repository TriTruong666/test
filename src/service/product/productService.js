import axios from 'axios';
export const getAllProduct = async () => {
  try {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // If token doesn't exist
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await axios.get('http://localhost:8080/product/list', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to Authorization header
      },
    });
    console.log(response.data)
    return response.data.result
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
