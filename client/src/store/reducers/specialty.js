import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchData = createAsyncThunk('specialty/fetchData', async (params) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/specialties', API_BASE_URL);
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

export const createSpecialty = createAsyncThunk('specialty/createSpecialty', async (specialty) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/specialty`, specialty);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateSpecialty = createAsyncThunk('specialty/updateSpecialty', async ({ id, specialty }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/specialty/${id}`, specialty);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteSpecialty = createAsyncThunk('specialty/deleteSpecialty', async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/specialty/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initialState = {
  data: [],
  allData: [],
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
  specialtyDialog: {
    open: false,
    action: 'add',
    initValue: {
      specialty_id: '',
      specialty_name: '',
      major_id: ''
    }
  }
};

const specialty = createSlice({
  name: 'specialty',
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
    setSpecialtyDialog: (state, action) => {
      state.specialtyDialog = { ...state.specialtyDialog, ...action.payload };
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
      .addCase(createSpecialty.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.specialtyDialog.open = false;
      })
      .addCase(updateSpecialty.fulfilled, (state, action) => {
        const updatedSpecialty = action.payload.data;
        const index = state.data.findIndex((specialty) => specialty.specialty_id === updatedSpecialty.specialty_id);
        if (index !== -1) {
          state.data[index] = updatedSpecialty;
          state.specialtyDialog.open = false;
        }
      })
      .addCase(deleteSpecialty.fulfilled, (state, action) => {
        const deletedSpecialtyId = action.payload.data.specialty_id;
        state.data = state.data.filter((specialty) => specialty.specialty_id !== deletedSpecialtyId);
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setSpecialtyDialog } = specialty.actions;

export default specialty.reducer;
