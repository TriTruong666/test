import React from "react";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleDelKoiModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch } from "react-redux";
export const DelKoi = () => {
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleDelKoiModal = () => {
    dispatch(toggleDelKoiModal());
  };
  return (
    <div className="del-koi-containter">
      <div className="del-koi-modal">
        <div className="del-koi-header">
          <strong>Delete Koi</strong>
          <i className="bx bx-x" onClick={handleToggleDelKoiModal}></i>
        </div>
        <div className="del-koi-main">
          <p>
            Are you sure to delete Your Koi Name koi?Are you sure to delete Your
            Koi Pond pond?
          </p>
        </div>
        <div className="submit">
          <button>Delete Confirm</button>
        </div>
      </div>
    </div>
  );
};
