import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES_PATH } from "src/helper/Constants";
import fetchInterceptor from "src/helper/fetchInterceptor";

export const getAssetsListAction = createAsyncThunk(
  "asset/getAssetsListAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_ASSETS_LIST,
        {
          method: "GET",
        }
      );
      //   console.log("responseData", responseData);
      return responseData?.assetList;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// const employeeId = JSON.parse(localStorage.getItem("employeeId"));

export const getAssetsBySpecificEmployeeIdAction = createAsyncThunk(
  "asset/getAssetsBySpecificEmployeeIdAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        `/employee/${arg}/asset`,
        {
          method: "GET",
        }
      );
      //   console.log("responseData", responseData);
      return responseData?.getAllAssetsForSpecificEmployeeResponse?.asset;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
