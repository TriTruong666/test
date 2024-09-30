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
import { VerifyForgetPage } from "../pages/auth/VerifyForgetPage";
import { ResetPass } from "../pages/auth/ResetPass";
import { NotFound } from "../pages/public/NotFound";
import { Unauthorize } from "../pages/public/Unauthorize";
import {
  LoggedWrapper,
  VerifyEmailSignupWrapper,
  VerifyEmailForgetWrapper,
  ResetPassWrapper,
} from "./LoggedWrapper";
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
    path: "/verify-signup",
    element: (
      <VerifyEmailSignupWrapper>
        <EmailVerifyPage />
      </VerifyEmailSignupWrapper>
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
    path: "/verify-forget-pass",
    element: (
      <VerifyEmailForgetWrapper>
        <VerifyForgetPage />
      </VerifyEmailForgetWrapper>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ResetPassWrapper>
        <ResetPass />
      </ResetPassWrapper>
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
    path: "/blogdetail/:blogId",
    element: <BlogDetail />,
  },
  {
    path: "/productdetail/:productId",
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
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/not-authorized",
    element: <Unauthorize />,
  },
];
