import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchData = createAsyncThunk('assignment_internship/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize },
    status,
    assignment_intern_id
  } = params;
  const url = new URL('/api/register-internships/assignmentInternship', API_BASE_URL);
  url.searchParams.set('id', assignment_intern_id ?? '');
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

export const fetchJobholder = createAsyncThunk('assignment_internship/fetchJobholder', async (params, { rejectWithValue }) => {
  const { id, query } = params;
  const url = new URL('api/register-internships/queryJobholder', API_BASE_URL);
  url.searchParams.set('id', id ?? '');
  url.searchParams.set('query', query ?? '');

  try {
    const response = await axios.get(url.href);
    const { data } = response;
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      return rejectWithValue(error.response.data);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const getRegisterInternship = createAsyncThunk('assignment_internship/getRegisterInternship', async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/internship-graduations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getJobholderIntenship = createAsyncThunk('assignment_internship/getJobholderIntenship', async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/register-internships/jobholder/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const changeJobholder = createAsyncThunk('assignment_internship/changeJobholder', async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register-internships/jobholder`, values);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const joinInternship = createAsyncThunk('assignment_internship/joinInternship', async (values) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register-internships/addJobholderIternship`, values);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initialState = {
  assignment_intern_id: '',
  assignment_intern: '',
  data: [],
  jobholders: [],
  jobholder_search: [],
  jobholders_isLoading: false,
  jobholderSearch_isLoading: false,
  isError: false,
  isLoading: false,
  isRefetching: false,
  open: false,
  status: '',
  rowCount: 0,
  columnFilters: [],
  globalFilter: '',
  sorting: [],
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  dialog: false
};

const assignment_internship = createSlice({
  name: 'assignment_internship',
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
    setAssignmentInternId: (state, action) => {
      state.assignment_intern_id = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setDialog: (state, action) => {
      state.dialog = action.payload;
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
        state.statistic = action.payload.statistic;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(getRegisterInternship.fulfilled, (state, action) => {
        state.assignment_intern = action.payload.data;
      })
      .addCase(getJobholderIntenship.pending, (state) => {
        state.jobholders_isLoading = true;
      })
      .addCase(getJobholderIntenship.fulfilled, (state, action) => {
        state.jobholders = action.payload.data;
        state.jobholders_isLoading = false;
      })
      .addCase(getJobholderIntenship.rejected, (state) => {
        state.jobholders_isLoading = false;
      })
      .addCase(fetchJobholder.pending, (state) => {
        state.jobholderSearch_isLoading = true;
      })
      .addCase(fetchJobholder.fulfilled, (state, action) => {
        state.jobholder_search = action.payload.data;
        state.jobholderSearch_isLoading = false;
      })
      .addCase(fetchJobholder.rejected, (state) => {
        state.jobholderSearch_isLoading = false;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setStatus, setOpen, setAssignmentInternId, setDialog } =
  assignment_internship.actions;

export default assignment_internship.reducer;
