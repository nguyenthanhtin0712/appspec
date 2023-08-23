import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { API_BASE_URL } from 'config';

// Async Thunk Actions
export const fetchDataCompany = createAsyncThunk('create_register_intern/fetchDataCompany', async (query, { rejectWithValue }) => {
  const url = new URL('/api/companies', API_BASE_URL);
  url.searchParams.set('query', query ?? '');

  try {
    const response = await axios.get(url.href);
    const { data } = response;
    return data.data.result;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      return rejectWithValue(error.response.data);
    } else {
      console.error(error);
      throw error;
    }
  }
});

export const getAllRecruitmentPosition = createAsyncThunk('create_register_intern/getAllRecruitmentPosition', async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recruitment-positions?all=true`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const initialState = {
  companyData: [],
  companySelected: [],
  isError: false,
  isLoading: false,
  isRefetching: false,
  companyQuery: '',
  openPositionDialog: false,
  positionOptions: {
    isLoading: false,
    data: []
  }
};

const create_register_intern = createSlice({
  name: 'create_register_intern',
  initialState,
  reducers: {
    setCompanyQuery: (state, action) => {
      state.companyQuery = action.payload;
    },
    setCompanySelected: (state, action) => {
      const isValid = !state.companySelected.find((item) => item.company_id === action.payload.company_id);
      if (isValid) state.companySelected = [...state.companySelected, action.payload];
    },
    removeCompanySelected: (state, action) => {
      state.companySelected = state.companySelected.filter((company) => company.company_id != action.payload.company_id);
    },
    setOpenPositionDialog: (state, action) => {
      state.openPositionDialog = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.companyData = action.payload;
        state.isError = false;
      })
      .addCase(fetchDataCompany.rejected, (state) => {
        state.isLoading = false;
        state.isRefetching = false;
        state.isError = true;
      })
      .addCase(getAllRecruitmentPosition.pending, (state) => {
        state.positionOptions.isLoading = true;
      })
      .addCase(getAllRecruitmentPosition.fulfilled, (state, action) => {
        state.positionOptions.isLoading = false;
        state.positionOptions.data = action.payload.data.result;
      })
      .addCase(getAllRecruitmentPosition.rejected, (state) => {
        state.positionOptions.isLoading = false;
      });
  }
});

export const { setCompanyQuery, setCompanySelected, removeCompanySelected, setOpenPositionDialog } = create_register_intern.actions;

export default create_register_intern.reducer;
