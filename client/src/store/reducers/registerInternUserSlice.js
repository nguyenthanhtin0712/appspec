import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('register_intern_user/fetchData', async ({ rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/register-internship/infoInternship`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      return rejectWithValue(error.response.data);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const getCopanies = createAsyncThunk('register_intern_user/getCompanies', async ({ rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/company-internships`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      return rejectWithValue(error.response.data);
    } else {
      console.error(error);
      throw error;
    }
  }
});

const initialState = {
  internship: '',
  list_copmnay: []
};

const register_intern_user = createSlice({
  name: 'register_intern_user',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.list_copmnay = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCopanies.fulfilled, (state, action) => {
        state.list_copmnay = action.payload.data;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.internship = action.payload.data;
      });
  }
});

export const { setCompany } = register_intern_user.actions;

export default register_intern_user.reducer;
