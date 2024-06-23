import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import employeeSlice from "./slice/employeeSlice";
import lookupSlice from "./slice/lookupSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    lookup: lookupSlice.reducer,
    employee: employeeSlice.reducer,
  },
});
