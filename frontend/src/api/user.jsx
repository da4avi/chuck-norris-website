import api from './api'

export const createUser = async (user) => {
    const response = await api.post('/api/v1/user', user)
    return response.data
}
export const loginUser = async (email, password) => {
    const body = { email, password }
    const response = await api.post('/api/v1/user/login', body)
    return response.data
}

export const updateUser = async (user) => {
    const response = await api.put(`/api/v1/user/${id}`, user)
    return response.data
}
export const getUser = async () => {
    const response = await api.get('/api/v1/user')
    return response.data
}
export const deleteUser = async () => {
    return api.delete(`/api/v1/user/${id}`)
}

export const getAllUsers = async () => { } //admin
export const getUserById = async (id) => { } //admin
export const updateUserById = async (user, id) => { } //admin
export const deleteUserById = async (id) => { } //admin
export const blockUser = async (id) => { } //admin
export const createAdmin = async (admin) => { } //admin

