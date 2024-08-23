import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

export const login = (username, password) => {
    return api.post('api-token-auth/', { username, password });
};

export const getProducts = (token) => {
    return api.get('api/produtos/', {
        headers: { Authorization: `Token ${token}` },
    });
};

export const createProducts = (token, products) => {
    return api.post('api/produtos/', products, {
        headers: { Authorization: `Token ${token}` },
    });
};

export const updateProducts = (token, id, products) => {
    return api.put(`api/produtos/${id}/`, products, {
        headers: { Authorization: `Token ${token}` },
    });
};

export const deleteProducts = (token, id) => {
    return api.delete(`api/produtos/${id}/`, {
        headers: { Authorization: `Token ${token}` },
    });
};

export default api;