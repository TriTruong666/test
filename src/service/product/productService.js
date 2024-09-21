import axios from 'axios';

const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZW1vLmNvbSIsInN1YiI6ImFkbWluIiwiZXhwIjoxNzI2OTM5MzQzLCJpYXQiOjE3MjY5MzU3NDMsImp0aSI6ImE5N2Y0YzMzLTZhMDUtNDkwMS1iMWI0LWJlMjM4ZmY4YjUxYSIsInNjb3BlIjoiQURNSU4ifQ.OuE6ujXV3Q7QMY5Hyo9CEz3zGTYsKLbQ9QbaN-H5EP38_cWAm72MEQfT8dFkTPkr1c6SGydVzh_OLWy3q-c9_g";

export const getAllProduct = async () => {
  try {
    const response = await axios.get('http://localhost:8080/product/list', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to Authorization header
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
