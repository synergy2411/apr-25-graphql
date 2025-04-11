import { ApolloProvider } from "@apollo/client";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";

import client from "./apollo/client";
import router from "./routes/router";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
