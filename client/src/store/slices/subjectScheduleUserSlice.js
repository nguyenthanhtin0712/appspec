import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

export const fetchData = createAsyncThunk('subject_schedule_user/fetchData', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects-schedule?all=true`);
    return response.data.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const showSubjectSchedule = createAsyncThunk('subject_schedule_user/showSubjectSchedule', async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subjects-schedule/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initialState = {
  data: [],
  isError: false,
  isLoading: true,
  query: '',
  idSelect: '',
  dataDetail: []
};

const subject_schedule_user = createSlice({
  name: 'subject_schedule_user',
  initialState,
  reducers: {
    setIdSelect: (state, action) => {
      state.idSelect = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.idSelect = state.data[0]?.openclass_time_id;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isError = true;
      })
      .addCase(showSubjectSchedule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showSubjectSchedule.fulfilled, (state, action) => {
        state.dataDetail = action.payload.data.subjects;
        state.isLoading = false;
      })
      .addCase(showSubjectSchedule.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setIdSelect, setQuery } = subject_schedule_user.actions;

export default subject_schedule_user.reducer;
