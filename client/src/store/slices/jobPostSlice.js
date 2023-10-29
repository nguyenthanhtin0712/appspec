import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('job_post/fetchData', async (params) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/job-posts', API_BASE_URL);
  url.searchParams.set('page', `${pageIndex + 1}`);
  url.searchParams.set('perPage', `${pageSize}`);
  url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
  url.searchParams.set('query', globalFilter ?? '');
  url.searchParams.set('sortBy', `${sorting.length !== 0 ? sorting[0].id : ''}`);
  url.searchParams.set('sortOrder', `${sorting.length !== 0 ? (sorting[0].desc ? 'desc' : 'asc') : ''}`);

  try {
    const response = await axios.get(url.href);
    const { data } = response;
    return {
      data: data.data.result,
      rowCount: data.data.meta.total
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createJobPost = createAsyncThunk('job_post/createJobPost', async (post, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/job-posts`, post);
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

export const updateJobPost = createAsyncThunk('job_post/updateJobPost', async (post, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/job-posts/${post.job_post_id}`, post);
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

export const deleteJobPost = createAsyncThunk('job_post/deleteJobPost', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/job-posts/${id}`);
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

export const getJobPostById = createAsyncThunk('job_post/getJobPostById', async (id) => {
  const response = await axios.get(`${API_BASE_URL}/job-posts/${id}`);
  return response.data;
});

const initialState = {
  data: [],
  isError: false,
  isLoading: true,
  isRefetching: false,
  rowCount: 0,
  columnFilters: [],
  globalFilter: '',
  sorting: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  idDelete: 0,
  viewData: null,
  dataUpdate: null
};

const job_post = createSlice({
  name: 'job_post',
  initialState,
  reducers: {
    setColumnFilters: (state, action) => {
      state.columnFilters = action.payload;
    },
    setGlobalFilter: (state, action) => {
      state.globalFilter = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setIdDeleteJobPost: (state, action) => {
      state.idDelete = action.payload;
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
      .addCase(createJobPost.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addCase(updateJobPost.fulfilled, (state, action) => {
        const updatedJobPost = action.payload.data;
        const index = state.data.findIndex((post) => post.job_post_id === updatedJobPost.job_post_id);
        if (index !== -1) {
          state.data[index] = updatedJobPost;
        }
      })
      .addCase(deleteJobPost.fulfilled, (state, action) => {
        const deletedJobPostId = action.payload.data.job_post_id;
        state.data = state.data.filter((post) => post.job_post_id !== deletedJobPostId);
      })
      .addCase(getJobPostById.fulfilled, (state, action) => {
        state.dataUpdate = action.payload.data;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setIdDeleteJobPost } = job_post.actions;

export default job_post.reducer;
