import axios from "axios";

export const register = async (infoUser) => {
    const response = await axios.post(`/auth/local/register`, infoUser);
    return response.data;
}

export const login = async (infoUser) => {
    const response = await axios.post(`/auth/local`, infoUser);
    return response.data;
}

export const getMeWithToken = async (token) => {
    const response = await axios.get(`/users/me?populate=*`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
