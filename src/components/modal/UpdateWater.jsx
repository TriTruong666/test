import React from "react";
// import styles
import "../../styles/components/modal/modal.css";
// import slices
import { toggleUpdateWaterModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch } from "react-redux";
export const UpdateWater = () => {
  // dispatch
  const dispatch = useDispatch();
  //   handle func
  const handleToggleUpdateWaterModal = () => {
    dispatch(toggleUpdateWaterModal());
  };
  return (
    <div className="update-water-container">
      <div className="update-water-modal">
        <div className="update-water-header">
          <strong>Update Water Quality</strong>
          <i className="bx bx-x" onClick={handleToggleUpdateWaterModal}></i>
        </div>
        <form action="" autoCorrect="off" className="update-water-form">
          <div className="input-two-fields">
            <input type="text" placeholder="NO2 (mg/l)" />
            <input type="text" placeholder="NO3 (mg/l)" />
          </div>
          <div className="input-two-fields">
            <input type="text" placeholder="NH3/NH4 (mg/l)" />
            <input type="text" placeholder="O2 (mg/l)" />
          </div>
          <div className="input-two-fields">
            <input type="text" placeholder="Salt (%)" />
            <input type="text" placeholder="pH" />
          </div>
          <input type="text" id="temp" placeholder="Temparature (℃  )" />
          <div className="submit">
            <button onClick={handleToggleUpdateWaterModal}>Cancel</button>
            <button>Create confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
