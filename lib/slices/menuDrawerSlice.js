import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const menuDrawerSlice = createSlice({
  name: "menuDrawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isOpen = true;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
    },
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = menuDrawerSlice.actions;

export default menuDrawerSlice.reducer;
