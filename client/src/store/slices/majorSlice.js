import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('major/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/majors', API_BASE_URL);
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

export const createMajor = createAsyncThunk('major/createMajor', async (major, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/majors`, major);
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

export const getAll = createAsyncThunk('major/getAll', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/majors/specialties`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateMajor = createAsyncThunk('major/updateMajor', async (major, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/majors/${major.major_id}`, major);
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

export const deleteMajor = createAsyncThunk('major/deleteMajor', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/majors/${id}`);
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

const majorDialog = {
  open: false,
  action: 'add',
  initValue: {
    major_id: '',
    major_name: ''
  }
};

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
  majorDialog,
  idDelete: '',
  openCofirmDialog: false
};

const major = createSlice({
  name: 'major',
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
    setMajorDialog: (state, action) => {
      state.majorDialog = { ...state.majorDialog, ...action.payload };
    },
    setCloseMajorDialog: (state) => {
      state.majorDialog = majorDialog;
    },
    setIdDelete: (state, action) => {
      state.idDelete = action.payload;
    },
    setOpenCofirmDialog: (state, action) => {
      state.openCofirmDialog = action.payload;
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
      .addCase(createMajor.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.majorDialog.open = false;
      })
      .addCase(updateMajor.fulfilled, (state, action) => {
        const updatedMajor = action.payload.data;
        const index = state.data.findIndex((major) => major.major_id === updatedMajor.major_id);
        if (index !== -1) {
          state.data[index] = updatedMajor;
          state.majorDialog.open = false;
        }
      })
      .addCase(deleteMajor.fulfilled, (state, action) => {
        const deletedMajorId = action.payload.data.major_id;
        state.data = state.data.filter((major) => major.major_id !== deletedMajorId);
      });
  }
});

export const {
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setMajorDialog,
  setOpenCofirmDialog,
  setCloseMajorDialog,
  setIdDelete
} = major.actions;

export default major.reducer;
