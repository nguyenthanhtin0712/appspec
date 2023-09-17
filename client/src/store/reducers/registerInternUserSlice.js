import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('register_intern_user/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/register-internships/result', API_BASE_URL);
  url.searchParams.set('status', status ?? '');
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

export const getInternship = createAsyncThunk('register_intern_user/getInternship', async () => {
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

export const getRegisterInternship = createAsyncThunk('register_intern_user/getRegisterInternship', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/register-internships`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const regsiterInternshipUser = createAsyncThunk('register_intern_user/registerInternshipUser', async (position) => {
  try {
    const response = await axios.post(`/internship-graduations/register`, position);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const regsiterInternshipOutOffcial = createAsyncThunk('register_intern_user/regsiterInternshipOutOffcial', async (position) => {
  try {
    const response = await axios.post(`/internship-graduations/register-out-offcial`, position);
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
  internship: '',
  list_company: [],
  register_internship: []
};

const register_intern_user = createSlice({
  name: 'register_intern_user',
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isRefetching = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.isRefetching = false;
        state.rowCount = action.payload.rowCount;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = true;
        state.isError = false;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.list_company = action.payload.data;
      })
      .addCase(getInternship.fulfilled, (state, action) => {
        state.internship = action.payload.data;
      })
      .addCase(getRegisterInternship.fulfilled, (state, action) => {
        state.register_internship = action.payload.data;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination } = register_intern_user.actions;

export default register_intern_user.reducer;
