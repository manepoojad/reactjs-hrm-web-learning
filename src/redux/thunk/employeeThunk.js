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

export const addEmployeePersonalDetailsAction = createAsyncThunk(
  "employee/addEmployeePersonalDetailsAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        `/employee/${arg?.employeeId}/personal`,
        {
          method: "POST",
          body: arg,
        }
      );

      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getEmployeeSpecificDetailsAction = createAsyncThunk(
  "employee/getEmployeeSpecificDetailsAction",
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

export const updateEmployeePersonalDetailsAction = createAsyncThunk(
  "employee/updateEmployeePersonalDetailsAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(`/employee/${arg?.id}`, {
        method: "PUT",
        body:arg
      });

      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
