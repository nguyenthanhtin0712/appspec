import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('subject_schedule/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/subjects-schedule', API_BASE_URL);
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

export const createSubjectSchedule = createAsyncThunk(
  'subject_schedule/createSubjectSchedule',
  async (subjectSchedule, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/subjects-schedule`, subjectSchedule);
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

export const showSubjectSchedule = createAsyncThunk('subject_schedule/showSubjectSchedule', async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects-schedule/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initValue = {
  openclass_time_semester: '',
  openclass_time_year: '',
  file_schedule: null
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
  subjectScheduleDialog: {
    open: false,
    initValue
  },
  idDelete: '',
  openCofirmDialog: false,
  idSelect: 0,
  dataDetail: null
};

const subject_schedule = createSlice({
  name: 'subject_schedule',
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
    setSubjectScheduleDialog: (state, action) => {
      state.subjectScheduleDialog = { ...state.subjectScheduleDialog, ...action.payload };
    },
    setIdDeleteSubject: (state, action) => {
      state.idDelete = action.payload;
    },
    setOpenCofirmDialog: (state, action) => {
      state.openCofirmDialog = action.payload;
    },
    closeSubjectScheduleDialog: (state) => {
      state.subjectScheduleDialog = {
        open: false,
        initValue
      };
    },
    setIdSelect: (state, action) => {
      state.idSelect = action.payload;
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
      .addCase(createSubjectSchedule.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.subjectScheduleDialog.open = false;
      })
      .addCase(showSubjectSchedule.fulfilled, (state, action) => {
        state.dataDetail = action.payload.data;
      });
  }
});

export const {
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setSubjectScheduleDialog,
  setIdDeleteSubject,
  setOpenCofirmDialog,
  closeSubjectScheduleDialog,
  setIdSelect
} = subject_schedule.actions;

export default subject_schedule.reducer;
