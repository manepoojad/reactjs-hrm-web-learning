import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchInterceptor from "src/helper/fetchInterceptor";

export const updateLeaveStatusAction = createAsyncThunk(
  "leave/updateLeaveStatusAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(`/leave/${arg?.id}/action`, {
        method: "PUT",
        body:arg
      });
      // console.log("responseData", responseData);
      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
