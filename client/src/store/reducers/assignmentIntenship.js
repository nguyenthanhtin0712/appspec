import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchData = createAsyncThunk('assignment_internship/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    registerSpecialtyId,
    majorId,
    status,
    pagination: { pageIndex, pageSize }
  } = params;
  console.log(registerSpecialtyId);
  console.log(majorId);
  const url = new URL('/api/register-specialties/result', API_BASE_URL);
  url.searchParams.set('majorId', 'DCT');
  url.searchParams.set('id', 1);
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
      statistic: data.data.statistic,
      data: data.data.students.result,
      rowCount: data.data.students.meta.total
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

export const getRegistrationInformation = createAsyncThunk('assignment_internship/getRegistrationInformation', async () => {
  try {
    const response = await axios.get(`/register-specialties`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getResultRegisterSpecialty = createAsyncThunk('assignment_internship/getResultRegisterSpecialty', async () => {
  try {
    const response = await axios.get(`/register-specialties/result`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getSpecialtiesForRegister = createAsyncThunk('assignment_internship/getSpecialtiesForRegister', async () => {
  const response = await axios.get(`/register-specialties/register`);
  return response.data;
});

export const getRegistrationInfoById = createAsyncThunk('assignment_internship/getRegistrationInfoById', async (id) => {
  try {
    const response = await axios.get(`/register-specialties/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getStatistic = createAsyncThunk('assignment_internship/getRegistrationInfoById', async (id) => {
  try {
    const response = await axios.get(`/register-specialties/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const userRegisteringForSpecialty = createAsyncThunk('assignment_internship/userRegisteringForSpecialty', async (specialty_id) => {
  try {
    const response = await axios.post(`/register-specialties/register`, { specialty_id });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const changeSpecialty = createAsyncThunk('assignment_internship/changeSpecialty', async (params) => {
  try {
    const response = await axios.post(`/register-specialties/change`, params);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getExportData = createAsyncThunk('assignment_internship/getExportData', async (params) => {
  try {
    const response = await axios.post(`/register-specialties/export`, params);
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
  status: '',
  majorId: '',
  userRegistrationPeriod: null,
  registrationPageInfo: null,
  statistic: [],
  majors: [],
  registerSpecialtyId: ''
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
    setMajorId: (state, action) => {
      state.majorId = action.payload;
    },
    setRegisterSpecialtyId: (state, action) => {
      state.registerSpecialtyId = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
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
      .addCase(getRegistrationInformation.fulfilled, (state, action) => {
        state.userRegistrationPeriod = action.payload.data;
        state.majors = action.payload.data.register_specialty_detail;
        state.majorId = action.payload.data.register_specialty_detail[0]?.major_id;
      })
      .addCase(getRegistrationInfoById.fulfilled, (state, action) => {
        state.userRegistrationPeriod = action.payload.data;
        state.majors = action.payload.data.register_specialty_detail;
        state.majorId = action.payload.data.register_specialty_detail[0]?.major_id;
      })
      .addCase(getSpecialtiesForRegister.fulfilled, (state, action) => {
        const { register_specialty_end_date, register_specialty_name, register_specialty_start_date, statistic, major_id } =
          action.payload.data;
        state.registrationPageInfo = { register_specialty_name, register_specialty_end_date, register_specialty_start_date };
        state.statistic = statistic;
        state.majorId = major_id;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setMajorId, setStatus, setRegisterSpecialtyId } =
  assignment_internship.actions;

export default assignment_internship.reducer;
