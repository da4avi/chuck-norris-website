import api from "./api";

export const registerUser = async (name, email, password) => {
  const body = { name, email, password };
  const response = await api.post("/api/v1/user/register", body);
  return response.data;
};
export const loginUser = async (email, password) => {
  const body = { email, password };
  const response = await api.post("/api/v1/user/login", body);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await api.put(`/api/v1/user/`, user);
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/api/v1/user/info");
  return response.data;
};

export const deleteUser = async () => {
  return api.delete(`/api/v1/user/`);
};

// Admin
export const getAllUsers = async () => {
  const response = await api.get("/api/v1/user/");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/v1/user/${id}`);
  return response.data;
};

export const updateUserById = async (user, id) => {
  const response = await api.put(`/api/v1/user/${id}`, user);
  return response.data;
};
export const deleteUserById = async (id) => {
  const response = await api.delete(`/api/v1/user/${id}`);
  return response.data;
};

export const blockUser = async (id) => {
  const response = await api.patch(`/api/v1/user/block/${id}`);
  return response.data;
};
export const unlockUser = async (id) => {
  const response = await api.patch(`/api/v1/user/unlock/${id}`);
  return response.data;
};

export const createAdmin = async (admin) => {
  const response = await api.get(`/api/v1/user/admin`, admin);
  return response.data;
};
