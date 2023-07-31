import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
// Async Thunk Actions
export const fetchData = createAsyncThunk('user/fetchData', async (params) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;

  const url = new URL('/api/users', 'http://localhost:8000');
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

export const createUser = createAsyncThunk('user/createUser', async (user) => {
  try {
    const response = await axios.post('/api/users', user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, user }) => {
  try {
    const response = await axios.put(`/api/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const user = createSlice({
  name: 'user',
  initialState: {
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
    }
  },
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
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
        state.isError = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload;
        const index = state.data.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          state.data[index] = updatedUser;
        }
        state.isError = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedUserId = action.payload;
        state.data = state.data.filter((user) => user.id !== deletedUserId);
        state.isError = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination } = user.actions;

export default user.reducer;
