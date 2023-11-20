import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('profile/fetchData', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const forgotPassword = createAsyncThunk('authentication/forgotPassword', async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/forget-password`, value);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const checkToken = createAsyncThunk('authentication/checkToken', async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/check-token`, token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const ChangePasswordToken = createAsyncThunk('authentication/ChangePassword', async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/change-password-token`, values);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initialState = {
  data: null,
  isLoadingInfo: false,
  isLoading: false
};

const forgotpassword = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setColumnFilters: (state, action) => {
      state.columnFilters = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoadingInfo = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoadingInfo = false;
        state.data = action.payload.data;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoadingInfo = false;
      });
  }
});

export const { test } = forgotpassword.actions;

export default forgotpassword.reducer;
