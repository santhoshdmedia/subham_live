import { createSlice } from "@reduxjs/toolkit";


const role_slice = createSlice({
  name: "role_slice",
  initialState: { value: {} },
  reducers: {
    assignRole: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { assignRole } = role_slice.actions;

export default role_slice.reducer;
