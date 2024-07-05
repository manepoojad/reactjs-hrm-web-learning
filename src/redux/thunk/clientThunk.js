import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES_PATH } from "src/helper/Constants";
import fetchInterceptor from "src/helper/fetchInterceptor";

export const addClientAction = createAsyncThunk(
  "client/addClientAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.CREATE_CLIENT,
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

export const getClientListAction = createAsyncThunk(
  "client/getClientListAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        API_ROUTES_PATH.GET_CLIENT_LIST,
        {
          method: "GET",
        }
      );
      //   console.log("responseData", responseData);
      return responseData?.clients;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateClientAction = createAsyncThunk(
  "client/updateClientAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(`/client/${arg?.id}`, {
        method: "PUT",
        body: arg,
      });
      //   console.log("responseData", responseData);
      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
