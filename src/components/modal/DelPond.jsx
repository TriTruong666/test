import React from "react";
// import styles
import "../../styles/components/modal/modal.css";
// import redux
import { useDispatch } from "react-redux";
// import slices
import { toggleDelPondModal } from "../../redux/slices/modal/modal";
export const DelPond = () => {
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleDelPondModal = () => {
    dispatch(toggleDelPondModal());
  };
  return (
    <div className="del-pond-containter">
      <div className="del-pond-modal">
        <div className="del-pond-header">
          <strong>Delete Pond</strong>
          <i className="bx bx-x" onClick={handleToggleDelPondModal}></i>
        </div>
        <div className="del-pond-main">
          <p>
            Are you sure to delete Your Koi Pond pond?Are you sure to delete
            Your Koi Pond pond?
          </p>
        </div>
        <div className="submit">
          <button>Delete Confirm</button>
        </div>
      </div>
    </div>
  );
};
