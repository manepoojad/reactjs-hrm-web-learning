import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchInterceptor from "src/helper/fetchInterceptor";

export const getAllocableEmployeeListAction = createAsyncThunk(
  "dashboard/getAllocableEmployeeListAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        `/employee/currentAllocableEmployee`,
        {
          method: "GET",
        }
      );
      //   console.log("responseData", responseData);
      return responseData?.allocableEmployees;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
