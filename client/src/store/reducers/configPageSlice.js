import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const getAllRegisterSpecialty = createAsyncThunk('config_page/getAllRegisterSpecialty', async () => {
  try {
    const response = await axios.get(`/register-specialties/admin?all=true`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const updateConfig = createAsyncThunk('config_page/updateConfig', async (config, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/configs/${config.display_config_id}`, config);
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
  data: []
};

const config_page = createSlice({
  name: 'config_page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRegisterSpecialty.fulfilled, (state, action) => {
      state.data = action.payload.data.result;
    });
  }
});

export default config_page.reducer;
