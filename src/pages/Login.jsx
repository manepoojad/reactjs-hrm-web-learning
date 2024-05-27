import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES_PATH } from "../helper/Constants";

const Login = () => {
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInputTextField = (e) => {
    const { name, value, type } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleClickSignIn = async () => {
    try {
      const response = await fetch(API_ROUTES_PATH.SIGN_IN, {
        method: "POST",
        body: JSON.stringify(signInData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response not ok");
      }
      const responseData = await response.json();
      Cookies.set("token", responseData.token, { expires: 7 });

      setSignInData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{
        margin: 8,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div>
        <TextField
          label="Email"
          type="email"
          placeholder="Enter email"
          name="email"
          value={signInData?.email}
          onChange={(e) => handleChangeInputTextField(e)}
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          placeholder="Enter password"
          name="password"
          value={signInData?.password}
          onChange={(e) => handleChangeInputTextField(e)}
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <div>
        <Button
          type="button"
          onClick={() => handleClickSignIn()}
          style={{ backgroundColor: "#00CE3F", color: "white" }}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
