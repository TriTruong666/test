import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/navbar/navbar.css";
export const Shopnav = () => {
  return (
    <div className="shopnav-container">
      <nav className="shopnav">
        <div className="shopnav-item">
          <strong>Category</strong>
          <div className="shopnav-item-link">
            <Link>Water supplies (50)</Link>
            <Link>Koi food (50)</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
