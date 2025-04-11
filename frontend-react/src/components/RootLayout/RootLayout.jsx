import { Outlet } from "react-router";
import MainNavigation from "../MainNavigation/MainNavigation";

function RootLayout() {
  return (
    <div className="container">
      <MainNavigation />
      <Outlet />
    </div>
  );
}

export default RootLayout;
