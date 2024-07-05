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

export const getAssetsBySpecificEmployeeIdAction = createAsyncThunk(
  "asset/getAssetsBySpecificEmployeeIdAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(`/employee/${arg}/asset`, {
        method: "GET",
      });
      //   console.log("responseData", responseData);
      return responseData?.getAllAssetsForSpecificEmployeeResponse?.asset;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const assignAssetsToEmployeeAction = createAsyncThunk(
  "asset/assignAssetsToEmployeeAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        `/employee/${arg.employeeId}/asset/${arg.assetId}`,
        {
          method: "POST",
          body: { assignedComment: arg?.assignedComment },
        }
      );
      //   console.log("responseData", responseData);
      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addAssetsAction = createAsyncThunk(
  "asset/addAssetsAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        `${API_ROUTES_PATH.CREATE_ASSETS}`,
        {
          method: "POST",
          body: arg,
        }
      );
      //   console.log("responseData", responseData);
      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateAssetsAction = createAsyncThunk(
  "asset/updateAssetsAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        `/asset/${arg?.id}`,
        {
          method: "PUT",
          body: arg,
        }
      );
      //   console.log("responseData", responseData);
      return responseData?.asset;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
