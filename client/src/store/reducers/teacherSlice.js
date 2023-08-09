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
  const url = new URL('/api/teachers', API_BASE_URL);
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

export const createTeacher = createAsyncThunk('student/createTeacher', async (student) => {
  try {
    console.log(student);
    const response = await axios.post(`${API_BASE_URL}/students`, student);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const addFileStudent = createAsyncThunk('student/addFileStudent', async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addFileStudents`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const addScoreStudent = createAsyncThunk('student/addScoreStudent', async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addScoreStudents`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateTeacher = createAsyncThunk('student/updateTeacher', async ({ id, student }) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/students/${id}`, student);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const deleteTeacher = createAsyncThunk('student/deleteTeacher', async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/teachers/${id}`);
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
      teacher_code: '',
      teacher_name: '',
      teacher_phone: '',
      teacher_email: '',
      teacher_birthday: null,
      teacher_title: '',
      teacher_spec: '',
      teacher_unit: ''
    }
  }
};

const teacher = createSlice({
  name: 'teacher',
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTeacherDialog: (state, action) => {
      state.studentDialog = { ...state.studentDialog, ...action.payload };
    },
    setTeacherFileDialog: (state, action) => {
      state.TeacherFileDialog = { ...state.TeacherFileDialog, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.isLoading = false;
        state.isRefetching = false;
        state.rowCount = action.payload.rowCount;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.studentDialog.open = false;
      })
      .addCase(addFileStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFileStudent.fulfilled, (state, action) => {
        // state.data = [...state.data, ...action.payload.data.result];
        state.TeacherFileDialog.open = false;
        state.isLoading = false;
        state.isRefetching = false;
        state.rowCount = action.payload.rowCount;
        state.isError = false;
      })
      .addCase(addFileStudent.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const updatedstudent = action.payload.data;
        const index = state.data.findIndex((student) => student.student_id === updatedstudent.student_id);
        if (index !== -1) {
          state.data[index] = updatedstudent;
          state.studentDialog.open = false;
        }
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedteacherId = action.payload.data.teacher_id;
        state.data = state.data.filter((teacher) => teacher.teacher_id !== deletedteacherId);
      })
      .addCase(deleteTeacher.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(addScoreStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addScoreStudent.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addScoreStudent.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setLoading, setTeacherDialog, setTeacherFileDialog } =
  teacher.actions;

export default teacher.reducer;
