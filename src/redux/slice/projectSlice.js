import { createSlice } from "@reduxjs/toolkit";
import {
    getProjectListAction,
    getProjectListByIdAction
} from "../thunk/projectThunk";

const initialState = {
  isLoading: false,
  projectList: [],
  ProjectListById: [],
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getProjectListAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProjectListAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectList = action.payload;
      })
      .addCase(getProjectListAction.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getProjectListByIdAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProjectListByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProjectListById = action.payload;
      })
      .addCase(getProjectListByIdAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = projectSlice.actions;

export default projectSlice;
