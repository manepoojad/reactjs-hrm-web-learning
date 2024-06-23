import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchInterceptor from "../helper/fetchInterceptor";

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
      const responseData = await fetchInterceptor(
        "/user/auth",

        {
          method: "POST",
          body: signInData,
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

      setSignInData({
        email: "",
        password: "",
      });
      navigate("/");
      return responseData;
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
