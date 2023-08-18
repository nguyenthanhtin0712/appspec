import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchData = createAsyncThunk('title/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/companies', API_BASE_URL);
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

export const createCompany = createAsyncThunk('company/createCompany', async (company, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/companies`, company);
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

export const updateCompany = createAsyncThunk('company/updateCompany', async (company, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/companies/${company.company_id}`, company);
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

export const deleteCompany = createAsyncThunk('company/deleteCompany', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/companies/${id}`);
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
  },
  companyDialog: {
    open: false,
    action: 'add',
    initValue: {
      company_name: '',
      company_email: '',
      company_phone: '',
      company_address: '',
      company_host: '',
      company_is_offcial: ''
    }
  }
};

const company = createSlice({
  name: 'company',
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
    setcompanyDialog: (state, action) => {
      state.companyDialog = { ...state.companyDialog, ...action.payload };
    },
    setCloseDialog: (state) => {
      state.companyDialog.open = false;
      state.companyDialog.initValue = {
        company_name: '',
        company_email: '',
        company_phone: '',
        company_address: '',
        company_host: '',
        company_is_offcial: ''
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
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.companyDialog.open = false;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const updatedCompany = action.payload.data;
        const index = state.data.findIndex((company) => company.company_id === updatedCompany.company_id);
        if (index !== -1) {
          state.data[index] = updatedCompany;
          state.companyDialog.open = false;
        }
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        const deletedcompanyId = action.payload.data.company_id;
        state.data = state.data.filter((company) => company.company_id !== deletedcompanyId);
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setcompanyDialog, setCloseDialog } = company.actions;

export default company.reducer;
