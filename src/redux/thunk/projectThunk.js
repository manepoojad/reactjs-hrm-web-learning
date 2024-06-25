import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchInterceptor from "src/helper/fetchInterceptor";

export const getProjectListAction = createAsyncThunk(
  "project/getProjectListAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor("/project", {
        method: "GET",
      });
      // console.log("responseData", responseData);
      return responseData?.project;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// http://localhost:8888/api/project/employee/2

const role = JSON.parse(localStorage.getItem("roles"));

export const getProjectListByIdAction = createAsyncThunk(
  "project/getProjectListByIdAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(`/project/employee/${arg}`, {
        method: "GET",
      });
      //   console.log("responseData", responseData);
      //   if (role == "Employee") {
      return responseData?.specificEmployeeProjectList?.projects;
      //   } else if (role == "HR") {
      //     return responseData?.projects;
      //   }
      //   console.log(responseData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
