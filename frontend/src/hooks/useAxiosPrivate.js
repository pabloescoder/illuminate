// import { axiosPrivate } from "../context/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import axios from "axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  // console.log("refresh:", refresh);
  const { auth } = useAuth();
  const { setauth } = useAuth();
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        // if (!config.headers["Authorization"]) {
        //   config.headers["Authorization"] = "Bearer " + auth?.accessToken;
        // }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // console.log("error.config", prevRequest);
        // console.log("printing url", error.config.url);
        if (
          error.config.url === "http://127.0.0.1:8000/user/api/token/refresh/"
        ) {
        } else if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refresh();
          // console.log("newaccesstoken:=>", newAccessToken);
          const accessToken = newAccessToken;
          setauth(accessToken);
          // console.log("accesstoken before prerequest:", auth);
          prevRequest.headers["Authorization"] = "Bearer " + newAccessToken;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, setauth, refresh]);
  return axios;
};

export default useAxiosPrivate;
