import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';
import { formatDateTimeSubmit } from 'utils/formatDateTime';

export const fetchData = createAsyncThunk('internship_graduation/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/internship-graduations', API_BASE_URL);
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

export const createInternshipGraduation = createAsyncThunk(
  'internship_graduation/createInternshipGraduation',
  async (internshipGraduation, { rejectWithValue }) => {
    try {
      const formattedData = {
        ...internshipGraduation,
        internship_graduation_start_date: formatDateTimeSubmit(internshipGraduation.internship_graduation_start_date),
        internship_graduation_end_date: formatDateTimeSubmit(internshipGraduation.internship_graduation_end_date)
      };
      const response = await axios.post(`/internship-graduations`, formattedData);
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

export const updateInternshipGraduation = createAsyncThunk(
  'internship_graduation/updateInternshipGraduation',
  async (internshipGraduation, { rejectWithValue }) => {
    try {
      const formattedData = {
        ...internshipGraduation,
        internship_graduation_start_date: formatDateTimeSubmit(internshipGraduation.internship_graduation_start_date),
        internship_graduation_end_date: formatDateTimeSubmit(internshipGraduation.internship_graduation_end_date)
      };
      const response = await axios.put(`/internship-graduations/${internshipGraduation.internship_graduation_id}`, formattedData);
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

export const deleteInternshipGraduation = createAsyncThunk(
  'internship_graduation/deleteInternshipGraduation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/internship-graduations/${id}`);
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

const initValue = {
  openclass_semester: '',
  openclass_year: '',
  internship_graduation_start_date: null,
  internship_graduation_end_date: null
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
  internshipGraduationDialog: {
    open: false,
    action: 'add',
    initValue
  },
  idUpdate: '',
  idDelete: '',
  openCofirmDialog: false
};

const internship_graduation = createSlice({
  name: 'internship_graduation',
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
    setIdDeleteIntership: (state, action) => {
      state.idDelete = action.payload;
    },
    setOpenCofirmDialog: (state, action) => {
      state.openCofirmDialog = action.payload;
    },
    setInternshipGraduationDialog: (state, action) => {
      state.internshipGraduationDialog = { ...state.internshipGraduationDialog, ...action.payload };
    },
    closeInternshipGraduationDialog: (state) => {
      state.internshipGraduationDialog = {
        open: false,
        action: 'add',
        initValue
      };
    },
    setIdUpdate: (state, action) => {
      state.idUpdate = action.payload;
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
      .addCase(createInternshipGraduation.fulfilled, (state, action) => {
        if (action.payload.status != 409) {
          state.data.push(action.payload.data);
          state.internshipGraduationDialog.open = false;
        }
      })
      .addCase(updateInternshipGraduation.fulfilled, (state, action) => {
        const updatedRegisterSpecalty = action.payload.data;
        const index = state.data.findIndex((item) => item.internship_graduation_id === updatedRegisterSpecalty.internship_graduation_id);
        if (index !== -1) {
          state.data[index] = updatedRegisterSpecalty;
          state.internshipGraduationDialog.open = false;
        }
      })
      .addCase(deleteInternshipGraduation.fulfilled, (state, action) => {
        const deleteInternshipGraduationId = action.payload.data.internship_graduation_id;
        state.data = state.data.filter((item) => item.internship_graduation_id !== deleteInternshipGraduationId);
      });
  }
});

export const {
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setIdDeleteIntership,
  setOpenCofirmDialog,
  setInternshipGraduationDialog,
  closeInternshipGraduationDialog,
  setIdUpdate
} = internship_graduation.actions;

export default internship_graduation.reducer;
