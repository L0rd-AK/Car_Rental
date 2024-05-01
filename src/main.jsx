import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./authProvider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Route} />
    </AuthProvider>
  </React.StrictMode>
);
