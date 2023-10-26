import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('page/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/pages', API_BASE_URL);
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

export const createPage = createAsyncThunk('page/createPage', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pages`, page);
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

export const updatePage = createAsyncThunk('page/updatePage', async (page, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/pages/${page.page_id}`, page);
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

export const deletePage = createAsyncThunk('page/deletePage', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/pages/${id}`);
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

export const viewPage = createAsyncThunk('page/viewPage', async (slug) => {
  const response = await axios.get(`${API_BASE_URL}/pages/${slug}`);
  return response.data;
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
  idDelete: 0,
  viewData: null
};

const page = createSlice({
  name: 'page',
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
    setIdDeletePage: (state, action) => {
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
      .addCase(createPage.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        const updatedPage = action.payload.data;
        const index = state.data.findIndex((page) => page.page_id === updatedPage.page_id);
        if (index !== -1) {
          state.data[index] = updatedPage;
        }
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        const deletedPageId = action.payload.data.page_id;
        state.data = state.data.filter((page) => page.page_id !== deletedPageId);
      })
      .addCase(viewPage.fulfilled, (state, action) => {
        state.viewData = action.payload.data;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setIdDeletePage } = page.actions;

export default page.reducer;
