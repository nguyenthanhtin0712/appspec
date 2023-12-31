import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('register_open_class/fetchData', async (params) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/subjects', API_BASE_URL);
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

export const getAllSubject = createAsyncThunk('register_open_class/getAllSubject', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects?all=true`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const registerOpenClass = createAsyncThunk('register_open_class/registerOpenClass', async (info) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register-open-class`, info);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getHistory = createAsyncThunk('register_open_class/getHistory', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/register-open-class/history`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getStatistic = createAsyncThunk('register_open_class/getStatistic', async (info) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/register-open-class/statistical?semester=${info?.semester}&year=${info?.year}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
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
  subjects: {
    isLoading: false,
    data: []
  },
  history: {
    data: [],
    isLoading: true
  },
  statistic: {
    timeOption: {
      id: 0,
      semester: '',
      year: ''
    },
    query: '',
    data: [],
    isLoading: true
  }
};

const register_open_class = createSlice({
  name: 'register_open_class',
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
    setTimeOption: (state, action) => {
      state.statistic.timeOption = action.payload;
    },
    setQuery: (state, action) => {
      state.statistic.query = action.payload;
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
      .addCase(getAllSubject.pending, (state) => {
        state.subjects.isLoading = true;
      })
      .addCase(getAllSubject.fulfilled, (state, action) => {
        state.subjects.isLoading = false;
        state.subjects.data = action.payload.data.result;
      })
      .addCase(getAllSubject.rejected, (state) => {
        state.subjects.isLoading = false;
      })
      .addCase(getHistory.pending, (state) => {
        state.history.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.history.isLoading = false;
        state.history.data = action.payload;
      })
      .addCase(getHistory.rejected, (state) => {
        state.history.isLoading = false;
      })
      .addCase(getStatistic.pending, (state) => {
        state.statistic.isLoading = true;
      })
      .addCase(getStatistic.fulfilled, (state, action) => {
        state.statistic.isLoading = false;
        state.statistic.data = action.payload.data;
      })
      .addCase(getStatistic.rejected, (state) => {
        state.statistic.isLoading = false;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setTimeOption, setQuery } = register_open_class.actions;

export default register_open_class.reducer;
