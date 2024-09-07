import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import pages
import { Homepage } from "../Homepage";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { ForgetPage } from "../pages/auth/ForgetPage";
import { Shop } from "../pages/public/Shop";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forget",
    element: <ForgetPage />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
]);
export default router;
