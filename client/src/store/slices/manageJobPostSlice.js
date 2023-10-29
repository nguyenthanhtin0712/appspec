import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('manage_job_post/fetchData', async (params) => {
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

export const deleteJobPost = createAsyncThunk('manage_job_post/deleteJobPost', async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/job-posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const confirmJobPost = createAsyncThunk('manage_job_post/confirmJobPost', async ({ id, confirm }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/job-posts/confirm/${id}`, { confirm });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getJobPostById = createAsyncThunk('manage_job_post/getJobPostById', async (id) => {
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
  viewId: 0,
  viewData: null,
  isLoadingViewData: true
};

const manage_job_post = createSlice({
  name: 'manage_job_post',
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
    },
    setViewId: (state, action) => {
      state.viewId = action.payload;
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
      .addCase(deleteJobPost.fulfilled, (state, action) => {
        const deletedJobPostId = action.payload.data.job_post_id;
        state.data = state.data.filter((post) => post.job_post_id !== deletedJobPostId);
      })
      .addCase(getJobPostById.pending, (state) => {
        state.isLoadingViewData = true;
      })
      .addCase(getJobPostById.fulfilled, (state, action) => {
        state.isLoadingViewData = false;
        state.viewData = action.payload.data;
      })
      .addCase(getJobPostById.rejected, (state) => {
        state.isLoadingViewData = false;
      })
      .addCase(confirmJobPost.fulfilled, (state, action) => {
        const { job_post_id, job_post_confirm } = action.payload.data;
        const index = state.data.findIndex((post) => post.job_post_id === job_post_id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], job_post_confirm };
        }
        state.viewData = { ...state.viewData, job_post_confirm };
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setIdDeleteJobPost, setViewId } = manage_job_post.actions;

export default manage_job_post.reducer;
