import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/modal/modal.css";
export const ModalSuccess = () => {
  return (
    <div className="login-success-modal-cover">
      <div className="modal">
        <i className="bx bx-badge-check"></i>
        <strong>Create Successfully</strong>
        <p>
          Create account success, please click to Close button to return
          loginpage.
        </p>
        <Link to="/login">Go To Login</Link>
      </div>
    </div>
  );
};
