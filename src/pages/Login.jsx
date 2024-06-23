import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginAction } from "src/redux/thunk/authThunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      await dispatch(userLoginAction(signInData)).unwrap();

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
