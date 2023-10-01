import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('warned_student_detail/fetchData', async (params) => {
  const {
    id,
    majorId,
    studentCourse,
    studentQuery,
    pagination: { pageIndex, pageSize }
  } = params;
  const url = new URL(`/api/warned-student/${id}`, API_BASE_URL);
  url.searchParams.set('page', `${pageIndex + 1}`);
  url.searchParams.set('perPage', `${pageSize}`);
  url.searchParams.set('majorId', majorId ?? '');
  url.searchParams.set('studentCourse', studentCourse ?? '');
  url.searchParams.set('studentQuery', studentQuery ?? '');

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

export const getMajors = createAsyncThunk('warned_student_detail/getMajors', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/majors?all=true`);
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
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  majorId: '',
  studentCourse: '',
  studentQuery: '',
  majors: []
};

const warned_student_detail = createSlice({
  name: 'warned_student_detail',
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setStudentQuery: (state, action) => {
      state.studentQuery = action.payload;
    },
    setStudentCourse: (state, action) => {
      state.studentCourse = action.payload;
    },
    setMajorId: (state, action) => {
      state.majorId = action.payload;
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
      .addCase(getMajors.fulfilled, (state, action) => {
        state.majors = action.payload.data.result;
      });
  }
});

export const { setColumnFilters, setGlobalFilter, setSorting, setPagination, setStudentQuery, setStudentCourse, setMajorId } =
  warned_student_detail.actions;

export default warned_student_detail.reducer;
