import api from "./api";

export const getCategory = async (id) => {
  const response = await api.get(`/api/v1/category/${id}`);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await api.get("/api/v1/category");
  return response.data;
};
