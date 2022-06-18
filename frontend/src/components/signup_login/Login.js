import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { Button, Link } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "3px solid #00214d",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function Login({
  open,
  handleOpen,
  handleClose,
  handleSignUpClick,
}) {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginData((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitLoginData = () => {
    console.log("Login Form Submitted");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login modal"
        aria-describedby="Allows the user to login with an existing account"
      >
        <Box sx={style}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ margin: 0, textAlign: "center" }}
          >
            Login
          </Typography>
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Welcome, great to see you back here!
          </Typography>
          <TextField
            sx={{ mt: 2, width: "100%" }}
            required
            name="email"
            label="Email"
            value={loginData.email}
            onChange={handleChange}
          />
          <TextField
            sx={{ mt: 2, width: "100%" }}
            required
            name="password"
            type="password"
            label="Password"
            value={loginData.password}
            onChange={handleChange}
          />
          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: -1, backgroundColor: "#00214d" }}
              onClick={submitLoginData}
            >
              Login
            </Button>
          </Box>
          <Link
            component="button"
            sx={{ mt: 3, mb: -1 }}
            variant="body2"
            onClick={handleSignUpClick}
          >
            Don't have an account?
          </Link>
        </Box>
      </Modal>
    </div>
  );
}
