import React from "react";
import { Navigate } from "react-router-dom";

const LoggedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // if user login yet
  if (token && user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default LoggedWrapper;
