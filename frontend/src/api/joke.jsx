import api from './api'

export const createJoke = async (joke) => {
    const response = await api.post('/api/v1/joke/', joke)
    return response.data
}

export const updateJoke = async (id, joke) => {
    const response = await api.put(`/api/v1/joke/${id}`, joke)
    return response.data
}


export const deleteJoke = async (id) => {
    return api.delete(`/api/v1/joke/${id}`)
}

export const getJoke = async (id) => {
    const response = await api.get(`/api/v1/joke/${id}`)
    return response.data
}

export const getJokes = async () => {
    const response = await api.get(`/api/v1/joke/`)
    return response.data
}