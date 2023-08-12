import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchData = createAsyncThunk('degree/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/degrees', API_BASE_URL);
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
    if (error.response && error.response.data && error.response.data.errors) {
      return rejectWithValue(error.response.data);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const createDegree = createAsyncThunk('degree/createDegree', async (degree, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/degrees`, degree);
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

export const updateDegree = createAsyncThunk('degree/updateDegree', async (degree, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/degrees/${degree.degree_id}`, degree);
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

export const deleteDegree = createAsyncThunk('degree/deleteDegree', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/degrees/${id}`);
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
  data: [],
  isError: false,
  isLoading: false,
  isRefetching: false,
  rowCount: 0,
  columnFilters: [],
  globalFilter: '',
  sorting: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  degreeDialog: {
    open: false,
    action: 'add',
    initValue: {
      degree_name: ''
    }
  }
};

const degree = createSlice({
  name: 'degree',
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
    setDegreeDialog: (state, action) => {
      state.degreeDialog = { ...state.degreeDialog, ...action.payload };
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
      .addCase(createDegree.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.degreeDialog.open = false;
      })
      .addCase(updateDegree.fulfilled, (state, action) => {
        const updatedDegree = action.payload.data;
        const index = state.data.findIndex((degree) => degree.degree_id === updatedDegree.degree_id);
        if (index !== -1) {
          state.data[index] = updatedDegree;
          state.degreeDialog.open = false;
        }
      })
      .addCase(deleteDegree.fulfilled, (state, action) => {
        const deleteddegreeId = action.payload.data.degree_id;
        state.data = state.data.filter((degree) => degree.degree_id !== deleteddegreeId);
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setDegreeDialog } = degree.actions;

export default degree.reducer;
