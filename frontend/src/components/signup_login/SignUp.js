import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import axios from "axios";

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

export default function SignUp({ open, handleOpen, handleClose }) {
  const [signUpData, setSignUpData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSignUpSuccessful, setIsSignUpSuccessful] = React.useState(false);
  const [showSignUpSuccess, setShowSignUpSuccess] = React.useState(false);

  const handleChange = (event) => {
    setSignUpData((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitSignUpData = async (e) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/user/api/register/",
        JSON.stringify(signUpData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //   console.log(response.data);
      //   console.log(response.accessToken);
      //   console.log(JSON.stringify(response));
      setIsSignUpSuccessful(true);
      setSignUpData({
        username: "",
        email: "",
        password: "",
      });
      setShowSignUpSuccess(true);
    } catch (err) {}
  };

  React.useEffect(() => {
    if (isSignUpSuccessful) {
      setTimeout(() => {
        setShowSignUpSuccess(false);
        handleClose();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignUpSuccessful]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="signup modal"
        aria-describedby="Allows the user to sign up with a new account"
      >
        <Box sx={style}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ margin: 0, textAlign: "center" }}
          >
            Sign Up
          </Typography>
          {showSignUpSuccess && (
            <Typography
              sx={{
                color: "white",
                backgroundColor: "green",
                textAlign: "center",
                mt: 1,
                padding: "0.5rem",
                borderRadius: "5px",
              }}
            >
              Signed up successfully! Closing this modal
            </Typography>
          )}
          <Typography sx={{ mt: 2 }}>
            We recommend a username that is unrelated to your personal info to
            maintain anonymity.
          </Typography>
          <TextField
            sx={{ mt: 2, width: "100%" }}
            required
            name="username"
            label="Username"
            value={signUpData.username}
            onChange={handleChange}
          />
          <TextField
            sx={{ mt: 2, width: "100%" }}
            required
            name="email"
            label="Email"
            value={signUpData.email}
            onChange={handleChange}
          />
          <TextField
            sx={{ mt: 2, width: "100%" }}
            required
            name="password"
            type="password"
            label="Password"
            value={signUpData.password}
            onChange={handleChange}
          />
          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: -1, backgroundColor: "#00214d" }}
              onClick={submitSignUpData}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
