import { createSlice } from "@reduxjs/toolkit";
import { getEmployeeListAction } from "../thunk/employeeThunk";

const initialState = {
  isLoading: false,
  employeeList: [],
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeListAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeListAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employeeList = action.payload.employeeList;
      })
      .addCase(getEmployeeListAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = employeeSlice.actions;

export default employeeSlice;
