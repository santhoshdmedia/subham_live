import { configureStore, combineReducers } from "@reduxjs/toolkit";

// slices
import role_slice from "./role_slice";
import theme_slice from "./theme_slice";

// combine
const allSlices = combineReducers({
  role: role_slice,
  theme: theme_slice,
});

const store = configureStore({
  reducer: allSlices,
});

export default store;
