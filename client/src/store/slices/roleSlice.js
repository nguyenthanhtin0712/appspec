import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('role/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/roles', API_BASE_URL);
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

export const getFunctional = createAsyncThunk('role/getFunctional', async () => {
  try {
    const response = await axios.get(`/functional`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getRole = createAsyncThunk('role/getRole', async (id) => {
  try {
    const response = await axios.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createRole = createAsyncThunk('role/createRole', async (value) => {
  try {
    const response = await axios.post(`/roles`, value);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateRole = createAsyncThunk('role/updateRole', async ({ id, value }) => {
  try {
    const response = await axios.put(`/roles/${id}`, value);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteRole = createAsyncThunk('role/deleteRole', async (id) => {
  try {
    const response = await axios.delete(`/roles/${id}`);
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
  functional: '',
  isLoadingFunc: false,
  selectedCheckboxes: {},
  isLoadingCreate: false,
  infoRole: '',
  idDelete: '',
  openCofirmDialog: false
};

const role = createSlice({
  name: 'role',
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
    setSelectedCheckboxes: (state, action) => {
      state.selectedCheckboxes = action.payload;
    },
    setOpenCofirmDialog: (state, action) => {
      state.openCofirmDialog = action.payload;
    },
    setIdDelete: (state, action) => {
      state.idDelete = action.payload;
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
      .addCase(getFunctional.pending, (state) => {
        state.isLoadingFunc = true;
      })
      .addCase(getFunctional.fulfilled, (state, action) => {
        state.isLoadingFunc = false;
        state.isRefetching = false;
        state.functional = action.payload.data;
        state.functional.forEach((func) => {
          func.permissions.forEach((permission) => {
            state.selectedCheckboxes = {
              ...state.selectedCheckboxes,
              [permission.name]: false
            };
          });
        });
        state.rowCount = action.payload.rowCount;
        state.isError = false;
      })
      .addCase(getFunctional.rejected, (state) => {
        state.isLoadingFunc = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(createRole.pending, (state) => {
        state.isLoadingCreate = true;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.isLoadingCreate = false;
      })
      .addCase(createRole.rejected, (state) => {
        state.isLoadingCreate = false;
      })
      .addCase(updateRole.pending, (state) => {
        state.isLoadingCreate = true;
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.isLoadingCreate = false;
      })
      .addCase(updateRole.rejected, (state) => {
        state.isLoadingCreate = false;
      })
      .addCase(getRole.pending, (state) => {
        state.isLoadingFunc = true;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.infoRole = action.payload.data;
        action.payload.data.permissions.forEach((per) => {
          state.selectedCheckboxes = {
            ...state.selectedCheckboxes,
            [per.name]: true
          };
        });
        state.isLoadingFunc = false;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const id = action.payload.data.id;
        state.data = state.data.filter((role) => role.id !== id);
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setSelectedCheckboxes, setOpenCofirmDialog, setIdDelete } =
  role.actions;

export default role.reducer;
