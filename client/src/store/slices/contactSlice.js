import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('contact/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/contacts', API_BASE_URL);
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

export const checkViewContact = createAsyncThunk('contact/checkViewContact', async (id) => {
  try {
    const response = await axios.post(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteContact = createAsyncThunk('contact/deleteContact', async (id) => {
  try {
    const response = await axios.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const sendMail = createAsyncThunk('contact/sendMail', async (message) => {
  try {
    const response = await axios.post(`/contacts/send`, message);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateContactConfig = createAsyncThunk('contact/sendMail', async (value) => {
  try {
    const response = await axios.post(`/contact-config`, value);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getContactConfig = createAsyncThunk('contact/getContactConfig', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contact-config`);
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
  contactDialog: {
    open: false,
    init: {}
  },
  isLoadingMail: false,
  idDelete: null,
  openConfirm: false,
  viewContact: null,
  openContact: false
};

const contact = createSlice({
  name: 'contact',
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
    setContactDialog: (state, action) => {
      state.contactDialog = { ...state.contactDialog, ...action.payload };
    },
    setIdDelete: (state, action) => {
      state.idDelete = action.payload;
    },
    setOpenConfirm: (state, action) => {
      state.openConfirm = action.payload;
    },
    setOpenContact: (state, action) => {
      state.openContact = action.payload;
    },
    setViewContact: (state, action) => {
      state.viewContact = action.payload;
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
      .addCase(sendMail.pending, (state) => {
        state.isLoadingMail = true;
      })
      .addCase(sendMail.fulfilled, (state) => {
        state.isLoadingMail = false;
      })
      .addCase(sendMail.rejected, (state) => {
        state.isLoadingMail = false;
      })
      .addCase(getContactConfig.fulfilled, (state, action) => {
        state.contactDialog.init = action.payload.data;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const id = action.payload.data.contact_id;
        state.data = state.data.filter((contact) => contact.contact_id != id);
      })
      .addCase(checkViewContact.fulfilled, (state, action) => {
        const id = action.payload.data.contact_id;
        const index = state.data.findIndex((contact) => contact.contact_id == id);
        state.data[index].contact_check = 1;
      });
  }
});

export const {
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setContactDialog,
  setIdDelete,
  setOpenConfirm,
  setOpenContact,
  setViewContact
} = contact.actions;

export default contact.reducer;
