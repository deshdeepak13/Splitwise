import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/auth/';
// const API_URL = 'http://localhost:3000/api/auth/';

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

const authService = { signup, login, getMe };

export default authService;
