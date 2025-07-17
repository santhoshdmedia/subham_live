import { createSlice } from "@reduxjs/toolkit";

const theme_slice = createSlice({
  name: "theme_slice",
  initialState: { values: "light" },
  reducers: {
    toggletheme: (state, action) => {
      state.values = action.payload;
    },
  },
});

export const { toggletheme } = theme_slice.actions;

export default theme_slice.reducer;
