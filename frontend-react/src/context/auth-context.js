import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  token: null,
});

export default AuthContext;
