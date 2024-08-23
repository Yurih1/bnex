// Armazena o token no localStorage
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// Recupera o token do localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Remove o token do localStorage
export const removeToken = () => {
    localStorage.removeItem('token');
};