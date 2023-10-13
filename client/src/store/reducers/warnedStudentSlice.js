import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('warned_student/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/warned-student', API_BASE_URL);
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

export const createWarnedStudent = createAsyncThunk('warned_student/createWarnedStudent', async (warnedStudent, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/warned-student`, warnedStudent);
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

export const deleteWarnedStudent = createAsyncThunk('warned_student/deleteWarnedStudent', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/warned-student/${id}`);
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

const initValue = {
  openclass_time_semester: '',
  openclass_time_year: '',
  file_warned_student: null
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
  warnedStudentDialog: {
    open: false,
    initValue
  },
  idDelete: 0,
  idSelect: 0,
  lookUpDialog: false
};

const warned_student = createSlice({
  name: 'warned_student',
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
    setWarnedStudentDialog: (state, action) => {
      state.warnedStudentDialog = { ...state.warnedStudentDialog, ...action.payload };
    },
    setIdDelete: (state, action) => {
      state.idDelete = action.payload;
    },
    closeWarnedStudentDialog: (state) => {
      state.warnedStudentDialog = {
        open: false,
        initValue
      };
    },
    setIdSelect: (state, action) => {
      state.idSelect = action.payload;
    },
    setLookUpDialog: (state, action) => {
      state.lookUpDialog = action.payload;
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
      .addCase(createWarnedStudent.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.warnedStudentDialog.open = false;
      })
      .addCase(deleteWarnedStudent.fulfilled, (state, action) => {
        const deletedSubjectId = action.payload.data.openclass_time_id;
        state.data = state.data.filter((subject) => subject.openclass_time_id !== deletedSubjectId);
      });
  }
});

export const {
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setWarnedStudentDialog,
  setIdDelete,
  closeWarnedStudentDialog,
  setIdSelect,
  setLookUpDialog
} = warned_student.actions;

export default warned_student.reducer;
