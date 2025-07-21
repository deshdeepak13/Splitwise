import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
// import axios from 'axios';
import {jwtDecode} from "jwt-decode";


const token = localStorage.getItem('token');

// ✅ Helper to validate token
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    // Check if token expired
    if (exp * 1000 < Date.now()) return false;
    return true;
  } catch (err) {
    return false;
  }
};

// Signup thunk
export const signup = createAsyncThunk(
  'auth/signup',
  async (formData, { rejectWithValue }) => {
    try {
      // const res = await axios.post('http://localhost:3000/api/auth/signup', formData);
      return await authService.signup(formData);
      // return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      // const res = await axios.post('http://localhost:3000/api/auth/login', formData);
      return await authService.login(formData);
      // return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: isTokenValid(token) ? token : null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
