import { createBrowserRouter } from "react-router";
import RootLayout from "../components/RootLayout/RootLayout";
import HomePage from "../pages/Home/HomePage";
import ContactPage from "../pages/Contact/ContactPage";
import PostsPage from "../pages/Posts/PostsPage";
import CreatePostPage from "../pages/CreatePost/CreatePostPage";
import LoginPage from "../pages/Login/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/posts",
        element: <PostsPage />,
      },
      {
        path: "/create-post",
        element: <CreatePostPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/contact", // http://localhost:5173/contact
        element: <ContactPage />,
      },
    ],
  },
]);

export default router;
