import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8700/api/v1/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// USERS
export const fetchUser = () => API.get("/user");
export const fetchUserById = (id) => API.get(`/user/${id}`);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const signUp = (newUser) => API.post("/user/signUp/", newUser);
export const signIn = (newUser) => API.post("/user/signIn/", newUser);
export const adminAuth = (newUser) => API.post("/user/admin-signIn/", newUser);

// PRODUCTS
export const createProducts = (newProducts) =>
  API.post("/products", newProducts);
export const fetchProducts = () => API.get("/products");
export const fetchProductsById = (id) => API.get(`/products/${id}`);
export const deleteProducts = (id) => API.delete(`/products/${id}`);
export const updateProducts = (id, data) => API.put(`/products/${id}`, data);

// Orders
export const createOrder = (newProducts) => API.post("/orders", newProducts);
export const fetchOrder = () => API.get("/orders");
export const fetchOrderByUserId = (userId) => API.get(`/orders/${userId}`);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);
export const updateOrder = (product, user, id) => API.put(`/orders/${id}`);

// Category
export const fetchCategories = () => API.get("/category");
export const createCategory = (newProducts) => API.post("/orders", newProducts);

// Inbox
export const createInbox = (newInbox) => API.post("/inbox", newInbox);
export const fetchInbox = () => API.get("/inbox");
