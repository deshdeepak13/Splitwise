import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData);
  return res.data;
};

const getMe = async (token) => {
  const res = await axios.get(API_URL + 'me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const authService = { register, login, getMe };
