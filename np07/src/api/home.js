import axios from "axios";

const API_BASE = "http://durgeshk-001-site1.anytempurl.com/api/Home"; 

export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE}/getProduct`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const addToCart = async (productId) => {
  try {
    const res = await axios.post(`${API_BASE}/addToCart/${productId}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCartItems = async () => {
  try {
    const res = await axios.get(`${API_BASE}/getCartItems`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
