import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES_PATH } from "src/helper/Constants";
import fetchInterceptor from "src/helper/fetchInterceptor";

export const getEmployeeListAction = createAsyncThunk(
  "employee/getEmployeeListAction",
  async (arg, thunkAPI) => {
    try {
        const responseData = await fetchInterceptor(
            API_ROUTES_PATH.GET_EMPLOYEE_LIST,
            {
              method: "GET",
            }
          );

    return responseData
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
