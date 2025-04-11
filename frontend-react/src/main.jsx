import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import RootLayout from "./components/RootLayout/RootLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/Home/HomePage";
import ContactPage from "./pages/Contact/ContactPage";
import PostsPage from "./pages/Posts/PostsPage";

// Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// Router
const router = createBrowserRouter([
  {
    path: "/", // http://localhost:5173
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
        path: "/contact", // http://localhost:5173/contact
        element: <ContactPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
