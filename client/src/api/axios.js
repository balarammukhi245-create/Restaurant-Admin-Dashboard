import axios from "axios";

const api = axios.create({
  baseURL: "https://restaurant-admin-dashboard-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
