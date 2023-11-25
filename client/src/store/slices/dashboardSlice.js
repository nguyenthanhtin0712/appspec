import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getRecentContact = createAsyncThunk('dashboard/getRecentContact', async () => {
  try {
    const response = await axios.get('/contacts?perPage=5');
    const { data } = response;
    return {
      data: data.data.result
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getRecentJobPost = createAsyncThunk('dashboard/getRecentJobPost', async () => {
  try {
    const response = await axios.get('/job-posts?page=1&perPage=5');
    const { data } = response;
    return {
      data: data.data.result
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getStatistic = createAsyncThunk('dashboard/getStatistic', async () => {
  try {
    const response = await axios.get('/statistics');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initialState = {
  recentContact: {
    data: [],
    isLoading: true
  },
  recentJobPost: {
    data: [],
    isLoading: true
  },
  statistic: null
};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecentContact.pending, (state) => {
        state.recentContact.isLoading = true;
      })
      .addCase(getRecentContact.fulfilled, (state, action) => {
        state.recentContact.isLoading = false;
        state.recentContact.data = action.payload.data;
      })
      .addCase(getRecentContact.rejected, (state) => {
        state.recentContact.isLoading = false;
      })
      .addCase(getRecentJobPost.pending, (state) => {
        state.recentJobPost.isLoading = true;
      })
      .addCase(getRecentJobPost.fulfilled, (state, action) => {
        state.recentJobPost.isLoading = false;
        state.recentJobPost.data = action.payload.data;
      })
      .addCase(getRecentJobPost.rejected, (state) => {
        state.recentJobPost.isLoading = false;
      })
      .addCase(getStatistic.fulfilled, (state, action) => {
        state.statistic = action.payload.data;
      });
  }
});

export default dashboard.reducer;
