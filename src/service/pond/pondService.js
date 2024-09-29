import axios from "axios";



/**
 * Creates a new pond by sending a POST request to the API with the provided pond data.
 *
 * @param {object} pondData - The data for the new pond to be created.
 * @return {object} The response data from the API.
 */
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



/**
 * Retrieves a list of all ponds by sending a GET request to the API.
 *
 * @return {object} The response data from the API containing the list of ponds.
 */
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



/**
 * Retrieves the pond information of a specific user by sending a GET request to the API.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise} A Promise that resolves to the pond information of the user.
 */
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




/**
 * Retrieves the details of a specific pond by sending a GET request to the API.
 *
 * @param {string} pondId - The ID of the pond to retrieve details for.
 * @return {object} The response data from the API containing the pond details.
 */
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



/**
 * Deletes a pond by sending a DELETE request to the API.
 *
 * @param {string} pondId - The ID of the pond to be deleted.
 * @return {object} The response data from the API containing the result of the deletion.
 */
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


/**
 * Updates a pond by sending a GET request to the API.
 *
 * @param {string} pondId - The ID of the pond to update.
 * @return {Promise} A Promise that resolves to the updated pond data.
 */
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
