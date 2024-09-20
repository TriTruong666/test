import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/modal/modal.css";
// import redux
import { useDispatch } from "react-redux";
// import slices
import { toggleLoginModal } from "../../redux/slices/modal/modal";
export const LoginSuccess = () => {
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleModal = () => {
    dispatch(toggleLoginModal());
  };
  return (
    <div className="login-success-modal-cover">
      <div className="modal">
        <i className="bx bx-badge-check"></i>
        <strong>Create Successfully</strong>
        <p>
          Create account success, please click to Close button to return
          loginpage.
        </p>
        <span
          style={{
            marginTop: "10px",
            fontSize: "0.8rem",
            border: "1px solid black",
            padding: "10px 30px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={handleToggleModal}
        >
          Close
        </span>
      </div>
    </div>
  );
};
