import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import fetchInterceptor from "src/helper/fetchInterceptor";

export const userLoginActionAction = createAsyncThunk(
  "auth/userLoginActionAction",
  async (arg, thunkAPI) => {
    try {
      const responseData = await fetchInterceptor(
        "/user/auth",
        {
          method: "POST",
          body: arg,
        }
      );
      const { employeeId, token, userEmail, roles } = responseData; // Modify this according to your API response structure
      // Set the token in cookies

      const roleList = roles.map((roleObject) => roleObject.label);

      localStorage.setItem("roles", JSON.stringify(roleList));
      localStorage.setItem("employeeId", JSON.stringify(employeeId));
      localStorage.setItem("userEmail", JSON.stringify(userEmail));

      Cookies.set("jwtToken", token, {
        expires: 7, // Expires in 7 days
        secure: true, // Cookie will only be sent over HTTPS
      });
      return responseData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
