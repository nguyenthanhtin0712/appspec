import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchData = createAsyncThunk('student/fetchData', async (params) => {
  const {
    columnFilters,
    globalFilter,
    sorting,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL('/api/students', API_BASE_URL);
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

export const createStudent = createAsyncThunk('student/createStudent', async (student) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/student`, student);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateStudent = createAsyncThunk('student/updateStudent', async ({ id, student }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/student/${id}`, student);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteStudent = createAsyncThunk('student/deleteStudent', async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/student/${id}`);
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
  studentDialog: {
    open: false,
    action: 'add',
    initValue: {
      user_firstname: '',
      user_lastname: '',
      user_gender: '',
      user_birthday: null,
      student_course: '',
      student_code: '',
      major_id: '',
      student_class: ''
    }
  }
};

const student = createSlice({
  name: 'student',
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
    setStudentDialog: (state, action) => {
      state.studentDialog = { ...state.studentDialog, ...action.payload };
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
      .addCase(createStudent.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.studentDialog.open = false;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const updatedstudent = action.payload.data;
        const index = state.data.findIndex((student) => student.student_id === updatedstudent.student_id);
        if (index !== -1) {
          state.data[index] = updatedstudent;
          state.studentDialog.open = false;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        const deletedstudentId = action.payload.data.student_id;
        state.data = state.data.filter((student) => student.student_id !== deletedstudentId);
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setStudentDialog } = student.actions;

export default student.reducer;
