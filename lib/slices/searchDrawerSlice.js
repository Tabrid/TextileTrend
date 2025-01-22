import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // The drawer is closed by default
};

const searchDrawerSlice = createSlice({
  name: "searchDrawer",
  initialState,
  reducers: {
    openSearchDrawer: (state) => {
      state.isOpen = true;
    },
    closeSearchDrawer: (state) => {
      state.isOpen = false;
    },
    toggleSearchDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openSearchDrawer, closeSearchDrawer, toggleSearchDrawer } = searchDrawerSlice.actions;

export default searchDrawerSlice.reducer;
