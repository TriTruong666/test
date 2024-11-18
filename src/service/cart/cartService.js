import axios from "axios";
//
//
//
// member
export const addToCartByMember = async (cartId, productId, quantity) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/${cartId}/add/${productId}`;

    const res = await axios.put(api, quantity, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data;
  }
};

export const createCart = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/create`;
    const res = await axios.post(api, userId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("cartId", res.data.result.cartId);
    return res.data;
  } catch (error) {
    return error.response.result;
  }
};

export const getCartByMember = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/user/${userId}`;
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateQuantity = async (cartId, cartItemId, quantity) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/${cartId}/update/${cartItemId}`;
    const res = await axios.put(api, quantity, {
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

export const deleteCartItem = async (cartItemId) => {
  const token = localStorage.getItem("token");
  try {
    const api = `http://localhost:8080/cart/delete/${cartItemId}`;
    const res = await axios.delete(api, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
