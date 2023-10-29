import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchListJobPost = createAsyncThunk('job_post_home/fetchListJobPost', async (params) => {
  const { query, page } = params;
  const url = new URL('/api/job-posts/list', API_BASE_URL);
  url.searchParams.set('page', `${page}`);
  url.searchParams.set('query', query ?? '');

  try {
    const response = await axios.get(url.href);
    const { data } = response;
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getJobPostById = createAsyncThunk('job_post_home/getJobPostById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/job-posts/${id}`);
  return response.data;
});

const initialState = {
  data: [],
  isError: false,
  isLoading: true,
  query: '',
  page: 1,
  total_page: 0,
  viewData: null
};

const job_post_home = createSlice({
  name: 'job_post_home',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPagination: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListJobPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchListJobPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.result;
        state.total_page = action.payload.meta.last_page;
        state.isError = false;
      })
      .addCase(fetchListJobPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getJobPostById.fulfilled, (state, action) => {
        state.viewData = action.payload.data;
      });
  }
});

export const { setQuery, setPagination } = job_post_home.actions;

export default job_post_home.reducer;
