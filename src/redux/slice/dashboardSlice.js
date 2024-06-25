import { createSlice } from "@reduxjs/toolkit";
import { getAllocableEmployeeListAction } from "../thunk/dashboardThunk";

const initialState = {
  isLoading: false,
  allocableEmployeeList: [],
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllocableEmployeeListAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllocableEmployeeListAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allocableEmployeeList = action.payload;
      })
      .addCase(getAllocableEmployeeListAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = dashboardSlice.actions;

export default dashboardSlice;
