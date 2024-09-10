import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/modal/modal.css";
export const LoginSuccess = () => {
  return (
    <div className="login-success-modal-cover">
      <div className="modal">
        <i className="bx bx-badge-check"></i>
        <strong>Login Successfully</strong>
        <p>Hello admin, please click to Close button to return homepage.</p>
        <Link to="/">Close</Link>
      </div>
    </div>
  );
};
