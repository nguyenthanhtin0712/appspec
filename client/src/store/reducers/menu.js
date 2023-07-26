import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  openItem: ['dashboard'],
  selectedID: null,
  drawerAdminOpen: false,
  drawerUserOpen: false,
  error: null
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeID(state, action) {
      state.selectedID = action.payload;
    },

    openAdminDrawer(state, action) {
      state.drawerAdminOpen = action.payload.drawerAdminOpen;
    },

    openUserDrawer(state, action) {
      state.drawerUserOpen = action.payload.drawerUserOpen;
    },

    hasError(state, action) {
      state.error = action.payload;
    }
  }
});

export default menu.reducer;

export const { activeItem, openAdminDrawer, openUserDrawer, activeID } = menu.actions;
