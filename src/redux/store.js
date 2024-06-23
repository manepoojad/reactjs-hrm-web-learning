import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import employeeSlice from "./slice/employeeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    employee: employeeSlice.reducer,
  },
});
