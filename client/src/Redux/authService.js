import axios from 'axios';

const API_URL = '/api/v1/';

const signup = async (userData) => {
  const res = await axios.post(API_URL + 'signup', userData);
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

export const authService = { signup, login, getMe };
