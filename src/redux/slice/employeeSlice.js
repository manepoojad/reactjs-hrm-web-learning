import { createSlice } from "@reduxjs/toolkit";
import { getEmployeeListAction } from "../thunk/authThunk";

const initialState = {
  isLoading: false,
  employeeList: [],
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getEmployeeListAction.pending]: (state, action) => {
      state.loading = true;
    },
    [getEmployeeListAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.employeeList = action.payload;
    },
    [getEmployeeListAction.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = employeeSlice.actions;

export default employeeSlice;
