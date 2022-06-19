import { createContext, useState } from "react";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [auth, setauth] = useState(null);
  const [refreshToken, setrefreshToken] = useState({});
  // console.log(auth);
  return (
    <AuthContext.Provider
      value={{ auth, setauth, refreshToken, setrefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
