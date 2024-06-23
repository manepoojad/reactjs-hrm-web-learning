import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES_PATH } from "src/helper/Constants";
import fetchInterceptor from "src/helper/fetchInterceptor";

export const getLookupAction = createAsyncThunk(
  "lookup/getLookupAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_ALL_LOOKUP_LIST,
        {
          method: "GET",
        }
      );
      console.log("responseData", responseData);
      return responseData.lookupData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
