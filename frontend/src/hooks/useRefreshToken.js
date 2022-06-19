import axios from "axios";
import { useContext } from "react";
// import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const useRefreshToken = () => {
  // console.log(auth.refresh);
  // const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setauth } = useContext(AuthContext);
  const { refreshToken } = useContext(AuthContext);
  // console.log("refreshTOken:", refreshToken);
  const refresh = async () => {
    // console.log(refreshToken);
    // console.log("previous access token=>", auth);
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/user/api/token/refresh/", // https://httpbin.org/post <- For Testing
        data: { refresh: refreshToken },
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + auth.accessToken,
        },
      });

      // console.log("response.data.access", response.data.access);
      setauth(response.data.access);
      return response.data.access;
    } catch (error) {
      navigate("/");
    }
  };
  return refresh;
};

export default useRefreshToken;
