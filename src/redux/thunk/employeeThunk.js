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

      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getEmployeeDataByIdAction = createAsyncThunk(
  "employee/getEmployeeDataByIdAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(`/employee/${arg}`, {
        method: "GET",
      });

      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateEmployeeStatusAction = createAsyncThunk(
  "employee/updateEmployeeStatusAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        `/employee/${arg?.employeeId}/statusOfemployee`,
        {
          method: "POST",
          body: {
            // employeeId: selectedEmployee?.id,
            comment: arg?.comment,
            lookupId: arg?.lookupId,
          },
        }
      );

      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
