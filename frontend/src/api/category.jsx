import api from "./api";

export const getCategory = async (id) => {
  const response = await api.get(`/api/v1/category/${id}`);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await api.get("/api/v1/category");
  return response.data;
};

export const updateCategory = async (id, category) => {
  // value, description
  const response = await api.put(`/api/v1/category/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/api/v1/category/${id}`);
  return response.data;
};

