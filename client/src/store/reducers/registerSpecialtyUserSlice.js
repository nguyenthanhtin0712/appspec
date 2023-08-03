import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchData = createAsyncThunk('register_specialty_user/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/register-specialties/result', API_BASE_URL);
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

export const getRegistrationInformation = createAsyncThunk('register_specialty_user/getRegistrationInformation', async () => {
  try {
    const response = await axios.get(`/register-specialties/user`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getResultRegisterSpecialty = createAsyncThunk('register_specialty_user/getResultRegisterSpecialty', async () => {
  try {
    const response = await axios.get(`/register-specialties/result`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const userRegisteringForSpecialty = createAsyncThunk('register_specialty_user/userRegisteringForSpecialty', async (specialty_id) => {
  try {
    const response = await axios.post(`/register-specialties/user`, { specialty_id });
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
  userRegistrationPeriod: null
};

const register_specialty_user = createSlice({
  name: 'register_specialty_user',
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
      .addCase(getRegistrationInformation.fulfilled, (state, action) => {
        state.userRegistrationPeriod = action.payload.data;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination } = register_specialty_user.actions;

export default register_specialty_user.reducer;
