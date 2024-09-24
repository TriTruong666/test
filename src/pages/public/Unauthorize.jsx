import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/notfound/notfound.css";
export const Unauthorize = () => {
  return (
    <div className="unauthorize-container">
      <div className="unauthorize">
        <i className="bx bxs-shield-x"></i>
        <strong>Unauthorize Page</strong>
        <p>
          This page was protected, you do not have permission to access this
          page.
        </p>
        <Link to="/">Return to Homepage</Link>
      </div>
    </div>
  );
};
