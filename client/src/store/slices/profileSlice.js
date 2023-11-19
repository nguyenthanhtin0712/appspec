import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';
import { toast } from 'react-toastify';

export const fetchData = createAsyncThunk('profile/fetchData', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const changePassword = createAsyncThunk('profile/changPassword', async (value) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/profile/change-password`, value);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const changeInformation = createAsyncThunk('profile/changeInformation', async (value) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/profile/change-information`, value);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;

      if (errors.user_email) {
        toast.warning('Email này đã được sử dụng');
      } else if (errors.user_phone) {
        toast.warning('Số điện thoại này đã được sử dụng');
      } else {
        console.error('Other validation errors:', errors);
      }
    } else {
      console.error(error);
      throw error;
    }
  }
});

const initialState = {
  data: null,
  isLoadingInfo: false,
  isLoading: false
};

const profile = createSlice({
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
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeInformation.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changeInformation.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { test } = profile.actions;

export default profile.reducer;
