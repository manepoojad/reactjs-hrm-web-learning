import { createSlice } from "@reduxjs/toolkit";
import {
    getAssetsBySpecificEmployeeIdAction,
    getAssetsListAction,
} from "../thunk/assetsThunk";

const initialState = {
  isLoading: false,
  assetsList: [],
  getAssetsListById: [],
};

const assetsSlice = createSlice({
  name: "assetsSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAssetsListAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAssetsListAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assetsList = action.payload.assetList;
      })
      .addCase(getAssetsListAction.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getAssetsBySpecificEmployeeIdAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        getAssetsBySpecificEmployeeIdAction.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.getAssetsListById = action.payload;
        }
      )
      .addCase(
        getAssetsBySpecificEmployeeIdAction.rejected,
        (state, action) => {
          state.isLoading = false;
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const {} = assetsSlice.actions;

export default assetsSlice;
