import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchData = createAsyncThunk('title/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/titles', API_BASE_URL);
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

export const createTitle = createAsyncThunk('title/createTitle', async (title, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/titles`, title);
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

export const updateTitle = createAsyncThunk('title/updateTitle', async (title, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/titles/${title.title_id}`, title);
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

export const deleteTitle = createAsyncThunk('title/deleteTitle', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/titles/${id}`);
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
  titleDialog: {
    open: false,
    action: 'add',
    initValue: {
      title_name: ''
    }
  }
};

const title = createSlice({
  name: 'title',
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
    setTitleDialog: (state, action) => {
      state.titleDialog = { ...state.titleDialog, ...action.payload };
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
      .addCase(createTitle.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.titleDialog.open = false;
      })
      .addCase(updateTitle.fulfilled, (state, action) => {
        const updatedTitle = action.payload.data;
        const index = state.data.findIndex((title) => title.title_id === updatedTitle.title_id);
        if (index !== -1) {
          state.data[index] = updatedTitle;
          state.titleDialog.open = false;
        }
      })
      .addCase(deleteTitle.fulfilled, (state, action) => {
        const deletedtitleId = action.payload.data.title_id;
        state.data = state.data.filter((title) => title.title_id !== deletedtitleId);
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setTitleDialog } = title.actions;

export default title.reducer;
