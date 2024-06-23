import { createSlice } from "@reduxjs/toolkit";
import { getLookupAction } from "../thunk/lookupThunk";

const initialState = {
  isLoading: false,
  lookupData:[]
};

const lookupSlice = createSlice({
  name: "lookupSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getLookupAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getLookupAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lookupData = action.payload;
      })
      .addCase(getLookupAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = lookupSlice.actions;

export default lookupSlice;
