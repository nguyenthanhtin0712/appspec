import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';
import { formatDateTimeSubmit } from 'utils/formatDateTime';

// Async Thunk Actions
export const fetchData = createAsyncThunk('jobholder/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/jobholders', API_BASE_URL);
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

export const getAllDegree = createAsyncThunk('jobholder/getAllDegree', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/degrees?all=true`);
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

export const getAllTitle = createAsyncThunk('jobholder/getAllTitle', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/titles?all=true`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getAllAcademicField = createAsyncThunk('jobholder/getAllAcademicField', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/academic-fields?all=true`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createJobholder = createAsyncThunk('jobholder/createJobholder', async (jobholder, { rejectWithValue }) => {
  try {
    jobholder.user_birthday = formatDateTimeSubmit(jobholder.user_birthday);
    const response = await axios.post(`${API_BASE_URL}/jobholders`, jobholder);
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

export const updateJobholder = createAsyncThunk('jobholder/updateJobholder', async (jobholder, { rejectWithValue }) => {
  try {
    jobholder.user_birthday = formatDateTimeSubmit(jobholder.user_birthday);
    const response = await axios.put(`${API_BASE_URL}/jobholders/${jobholder.user_id}`, jobholder);
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

export const deleteJobholder = createAsyncThunk('jobholder/deleteJobholder', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/jobholders/${id}`);
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
  dataDegree: [],
  dataTitle: [],
  dataAcademicField: [],
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
  jobholderDialog: {
    open: false,
    action: 'add',
    initValue: {
      user_firstname: '',
      user_lastname: '',
      user_gender: '',
      user_birthday: null,
      user_password: '',
      user_phone: '',
      user_email: '',
      jobholder_code: '',
      jobholder_unit: '',
      jobholder_specialty: '',
      jobholder_position: '',
      jobholder_type: '',
      jobholder_degree: '',
      title_id: '',
      academic_field_id: '',
      jobholder_isLeader: false
    }
  }
};

const jobholder = createSlice({
  name: 'jobholder',
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
    setJobholderDialog: (state, action) => {
      state.jobholderDialog = { ...state.jobholderDialog, ...action.payload };
    },
    setCloseDialog: (state) => {
      state.jobholderDialog.open = false;
      state.jobholderDialog.initValue = {
        user_firstname: '',
        user_lastname: '',
        user_gender: '',
        user_birthday: null,
        user_password: '',
        user_phone: '',
        user_email: '',
        jobholder_code: '',
        jobholder_unit: '',
        jobholder_specialty: '',
        jobholder_position: '',
        jobholder_type: '',
        jobholder_degree: '',
        title_id: '',
        academic_field_id: '',
        jobholder_isLeader: false
      };
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
      .addCase(getAllDegree.fulfilled, (state, action) => {
        state.dataDegree = action.payload.data.result;
      })
      .addCase(getAllTitle.fulfilled, (state, action) => {
        state.dataTitle = action.payload.data.result;
      })
      .addCase(getAllAcademicField.fulfilled, (state, action) => {
        state.dataAcademicField = action.payload.data.result;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(createJobholder.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.jobholderDialog.open = false;
      })
      .addCase(updateJobholder.fulfilled, (state, action) => {
        const updatedJobholder = action.payload.data;
        const index = state.data.findIndex((jobholder) => jobholder.jobholder_code === updatedJobholder.jobholder_code);
        if (index !== -1) {
          state.data[index] = updatedJobholder;
          state.jobholderDialog.open = false;
        }
      })
      .addCase(deleteJobholder.fulfilled, (state, action) => {
        const deletedJobholderId = action.payload.data.jobholder_code;
        state.data = state.data.filter((jobholder) => jobholder.jobholder_code !== deletedJobholderId);
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setJobholderDialog, setCloseDialog } = jobholder.actions;

export default jobholder.reducer;
