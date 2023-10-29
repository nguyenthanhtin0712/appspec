import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('job_post/fetchData', async (params) => {
  const { query, pageIndex } = params;
  const url = new URL('/api/job-posts/list', API_BASE_URL);
  url.searchParams.set('page', `${pageIndex + 1}`);
  url.searchParams.set('query', query ?? '');

  try {
    const response = await axios.get(url.href);
    const { data } = response;
    return data.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getJobPostById = createAsyncThunk('job_post/getJobPostById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/job-posts/${id}`);
  return response.data;
});

const initialState = {
  data: [],
  isError: false,
  isLoading: true,
  query: '',
  page: 0,
  viewData: null
};

const job_post = createSlice({
  name: 'job_post',
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
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.data = action.payload.data;
        state.rowCount = action.payload.rowCount;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(getJobPostById.fulfilled, (state, action) => {
        state.dataUpdate = action.payload.data;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setIdDeleteJobPost } = job_post.actions;

export default job_post.reducer;
