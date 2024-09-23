import React from "react";
// import pages
import { Homepage } from "../Homepage";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { ForgetPage } from "../pages/auth/ForgetPage";
import { Shop } from "../pages/public/Shop";
import { Blog } from "../pages/public/Blog";
import { BlogDetail } from "../pages/public/BlogDetail";
import { ProductDetail } from "../pages/public/ProductDetail";
import { Cart } from "../pages/public/Cart";
import { Checkout } from "../pages/public/Checkout";
import { EmailVerifyPage } from "../pages/auth/EmailVerifyPage";
import { LoggedWrapper, VerifyEmailWrapper } from "./LoggedWrapper";
export const publicRoutes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: (
      <LoggedWrapper>
        <LoginPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/signup",
    element: (
      <LoggedWrapper>
        <SignupPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/verify",
    element: (
      <VerifyEmailWrapper>
        <EmailVerifyPage />
      </VerifyEmailWrapper>
    ),
  },
  {
    path: "/forget",
    element: (
      <LoggedWrapper>
        <ForgetPage />
      </LoggedWrapper>
    ),
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blogdetail",
    element: <BlogDetail />,
  },
  {
    path: "/productdetail",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
];
