import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("todo_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (payload) => {
  const { data } = await api.post("/api/auth/register", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
};

export const getTodos = async () => {
  const { data } = await api.get("/api/todos");
  return data;
};

export const createTodo = async (payload) => {
  const { data } = await api.post("/api/todos", payload);
  return data;
};

export const updateTodo = async (id, payload) => {
  const { data } = await api.put(`/api/todos/${id}`, payload);
  return data;
};

export const deleteTodo = async (id) => {
  const { data } = await api.delete(`/api/todos/${id}`);
  return data;
};

export default api;
