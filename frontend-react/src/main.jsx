import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout/RootLayout";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/", // http://localhost:5173
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <h1>Home Page</h1>,
      },
      {
        path: "/contact", // http://localhost:5173/contact
        element: <h1>Contact Page</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
