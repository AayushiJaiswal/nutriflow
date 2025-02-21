import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend URL

export const registerUser = (userData) => axios.post(`${API_BASE_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_BASE_URL}/auth/login`, userData);
export const getProducts = () => axios.get(`${API_BASE_URL}/products`);
export const addToCart = (userId, productId, quantity) => 
  axios.post(`${API_BASE_URL}/cart/add`, { userId, productId, quantity });
export const placeOrder = (userId, orderDetails) => 
  axios.post(`${API_BASE_URL}/orders/place`, { userId, ...orderDetails });
