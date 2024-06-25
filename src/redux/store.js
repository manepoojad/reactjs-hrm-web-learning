import { configureStore } from "@reduxjs/toolkit";
import assetsSlice from "./slice/assetsSlice";
import authSlice from "./slice/authSlice";
import employeeSlice from "./slice/employeeSlice";
import lookupSlice from "./slice/lookupSlice";
import projectSlice from "./slice/projectSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    lookup: lookupSlice.reducer,
    employee: employeeSlice.reducer,
    assets: assetsSlice.reducer,
    project:projectSlice.reducer
  },
});
