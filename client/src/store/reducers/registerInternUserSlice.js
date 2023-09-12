import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('register_intern_user/fetchData', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/register-internship/infoInternship`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getCompanies = createAsyncThunk('register_intern_user/getCompanies', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/company-internships`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initialState = {
  internship: '',
  list_company: []
};

const register_intern_user = createSlice({
  name: 'register_intern_user',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.list_company = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.list_company = action.payload.data;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.internship = action.payload.data;
      });
  }
});

export const { setCompany } = register_intern_user.actions;

export default register_intern_user.reducer;
