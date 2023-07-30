import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';
import { formatDateTime } from 'utils/formatDateTime';

// Async Thunk Actions
export const fetchData = createAsyncThunk('register_specialty/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/register_specialties', API_BASE_URL);
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

export const createRegisterSpecalty = createAsyncThunk(
  'register_specialty/createRegisterSpecalty',
  async (specialty, { rejectWithValue }) => {
    try {
      const formattedSpecialty = {
        ...specialty,
        register_specialty_end_date: formatDateTime(specialty.register_specialty_end_date),
        register_specialty_start_date: formatDateTime(specialty.register_specialty_start_date)
      };

      const response = await axios.post(`${API_BASE_URL}/register_specialty`, formattedSpecialty);
      return response.data;
    } catch (error) {
      if (error.response?.data?.errors) {
        return rejectWithValue(error.response.data);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
);

export const updateRegisterSpecalty = createAsyncThunk(
  'register_specialty/updateRegisterSpecalty',
  async (specialty, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/register_specialty/${specialty.register_specialty_id}`, specialty);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        return rejectWithValue(error.response.data);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
);

export const deleteRegisterSpecalty = createAsyncThunk('register_specialty/deleteRegisterSpecalty', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/register_specialty/${id}`);
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
  }
};

const register_specialty = createSlice({
  name: 'register_specialty',
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
      .addCase(createRegisterSpecalty.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addCase(updateRegisterSpecalty.fulfilled, (state, action) => {
        const updatedRegisterSpecalty = action.payload.data;
        const index = state.data.findIndex((item) => item.register_specialty_id === updatedRegisterSpecalty.register_specialty_id);
        if (index !== -1) {
          state.data[index] = updatedRegisterSpecalty;
        }
      })
      .addCase(deleteRegisterSpecalty.fulfilled, (state, action) => {
        console.log(action.payload.data);
        const deletedRegisterSpecaltyId = action.payload.data.register_specialty_id;
        state.data = state.data.filter((item) => item.register_specialty_id !== deletedRegisterSpecaltyId);
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination } = register_specialty.actions;

export default register_specialty.reducer;
