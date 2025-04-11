import { Outlet } from "react-router";
import MainNavigation from "../MainNavigation/MainNavigation";
import AuthContext from "../../context/auth-context";
import { useState } from "react";

function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="container">
        <MainNavigation />
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}

export default RootLayout;
