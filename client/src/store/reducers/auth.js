// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from '../../api/axios';

const initialState = {
  isAuthenticated: false,
  isLoaded: false,
  error: null,
  currentUser: null,
  token: Cookies.get('token') || null,
  roles: [],
  permissions: []
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/login`, credentials);
    const token = response.data.data.accessToken;
    const user = response.data.data.user_info;
    const roles = response.data.data.roles;
    const permissions = response.data.data['roles.permissions'].map((item) => item.name);
    Cookies.set('token', token, { expires: 15 });
    return { token, user, roles, permissions };
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    await axios.get(`/logout`);
    Cookies.remove('token');
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getUserDataFromToken = createAsyncThunk('auth/getUserDataFromToken', async () => {
  try {
    const response = await axios.get(`/user`);
    const user = response.data.data.user_info;
    const roles = response.data.data.roles;
    const permissions = response.data.data['roles.permissions'].map((item) => item.name);
    return { user, roles, permissions };
  } catch (error) {
    Cookies.remove('token');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoaded = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.currentUser = action.payload.user;
        state.roles = action.payload.roles;
        state.permissions = action.payload.permissions;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoaded = true;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.currentUser = null;
        state.roles = [];
        state.permissions = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUserDataFromToken.pending, (state) => {
        state.isLoaded = false;
        state.error = null;
      })
      .addCase(getUserDataFromToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoaded = true;
        state.currentUser = action.payload.user;
        state.roles = action.payload.roles;
        state.permissions = action.payload.permissions;
      })
      .addCase(getUserDataFromToken.rejected, (state, action) => {
        state.isLoaded = true;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  }
});

export default authSlice.reducer;
