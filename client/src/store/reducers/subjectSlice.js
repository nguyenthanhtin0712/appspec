import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('subject/fetchData', async (params, { rejectWithValue }) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/subjects', API_BASE_URL);
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

export const createSubject = createAsyncThunk('subject/createSubject', async (subject, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subjects`, subject);
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

export const updateSubject = createAsyncThunk('subject/updateSubject', async (subject, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/subjects/${subject.subject_id}`, subject);
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

export const deleteSubject = createAsyncThunk('subject/deleteSubject', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/subjects/${id}`);
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

export const getAllSubject = createAsyncThunk('subject/getAllSubject', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects?all=true`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getAllAcademicFields = createAsyncThunk('subject/getAllAcademicFields', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/academic-fields?all=true`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initValue = {
  subject_id: '',
  subject_name: '',
  subject_credit: '',
  subject_coeffcient: '',
  subject_LT: '',
  subject_BT: '',
  subject_TH: '',
  academic_field_id: '',
  subject_previous: []
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
  subjectDialog: {
    open: false,
    action: 'add',
    initValue
  },
  academicFields: [],
  idDelete: '',
  openCofirmDialog: false,
  subjectPreviousOptions: {
    isLoading: false,
    data: []
  }
};

const subject = createSlice({
  name: 'subject',
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
    setSubjectDialog: (state, action) => {
      state.subjectDialog = { ...state.subjectDialog, ...action.payload };
    },
    setIdDeleteSubject: (state, action) => {
      state.idDelete = action.payload;
    },
    setOpenCofirmDialog: (state, action) => {
      state.openCofirmDialog = action.payload;
    },
    closeSubjectDialog: (state) => {
      state.subjectDialog = {
        open: false,
        action: 'add',
        initValue
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
      .addCase(createSubject.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.subjectDialog.open = false;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        const updatedSubject = action.payload.data;
        const index = state.data.findIndex((subject) => subject.subject_id === updatedSubject.subject_id);
        if (index !== -1) {
          state.data[index] = updatedSubject;
          state.subjectDialog.open = false;
        }
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        const deletedSubjectId = action.payload.data.subject_id;
        state.data = state.data.filter((subject) => subject.subject_id !== deletedSubjectId);
      })
      .addCase(getAllAcademicFields.fulfilled, (state, action) => {
        state.academicFields = action.payload.data.result;
      })
      .addCase(getAllSubject.pending, (state) => {
        state.subjectPreviousOptions.isLoading = true;
      })
      .addCase(getAllSubject.fulfilled, (state, action) => {
        state.subjectPreviousOptions.isLoading = false;
        state.subjectPreviousOptions.data = action.payload.data.result;
      })
      .addCase(getAllSubject.rejected, (state) => {
        state.subjectPreviousOptions.isLoading = false;
      });
  }
});

export const {
  setColumnFilters,
  setGlobalFilter,
  setSorting,
  setPagination,
  setSubjectDialog,
  setIdDeleteSubject,
  setOpenCofirmDialog,
  closeSubjectDialog
} = subject.actions;

export default subject.reducer;
