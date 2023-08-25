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

export const getAllRecruitmentPosition = createAsyncThunk('create_register_intern/getAllRecruitmentPosition', async (company_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recruitment-positions?companyId=${company_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const createRecruitmentPosition = createAsyncThunk(
  'create_register_intern/createRecruitmentPosition',
  async (position, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/recruitment-positions`, position);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        return rejectWithValue(error.response.data);
      } else {
        console.error(error);
        throw error;
      }
    }
  }
);

const initialState = {
  companyData: [],
  companySelected: [],
  isError: false,
  isLoading: false,
  isRefetching: false,
  companyQuery: '',
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
      if (isValid) {
        const compamy = { ...action.payload };
        compamy.positions = [];
        state.companySelected = [...state.companySelected, compamy];
      }
    },
    removeCompanySelected: (state, action) => {
      state.companySelected = state.companySelected.filter((company) => company.company_id != action.payload.company_id);
    },
    setPositionOptions: (state, action) => {
      state.positionOptions.data = action.payload;
    },
    setPositionQuantity: (state, action) => {
      const { company_id, position_id } = action.payload.position;
      const { quantity } = action.payload;
      state.companySelected = state.companySelected.map((company) => {
        if (company.company_id === company_id) {
          return {
            ...company,
            positions: company.positions.map((position) => {
              if (position.position_id === position_id) {
                return {
                  ...position,
                  position_quantity: quantity
                };
              }
              return position;
            })
          };
        }
        return company;
      });
    },
    setRecruitmentPosition: (state, action) => {
      const companyId = action.payload.companyId;
      const positionsPayload = action.payload.positions;

      state.companySelected = state.companySelected.map((company) => {
        if (company.company_id === companyId) {
          return {
            ...company,
            positions: positionsPayload.map((position) => {
              const newPosition = company.positions.find((newPos) => newPos.position_id === position.position_id);
              return {
                ...position,
                position_quantity: newPosition ? newPosition.position_quantity : 0
              };
            })
          };
        }
        return company;
      });
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
      })
      .addCase(createRecruitmentPosition.fulfilled, (state, action) => {
        state.positionOptions.data.push(action.payload.data);
      });
  }
});

export const {
  setCompanyQuery,
  setCompanySelected,
  removeCompanySelected,
  setPositionOptions,
  setRecruitmentPosition,
  setPositionQuantity
} = create_register_intern.actions;

export default create_register_intern.reducer;
