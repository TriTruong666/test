import React from "react";
// import styles
import "../../styles/components/koi/koi.css";
// import assets
import image from "../../assets/logincover2.jpg";
// import redux
import { useDispatch } from "react-redux";
// import slices
import {
  toggleDetailKoiModal,
  toggleKoiHistoryOff,
} from "../../redux/slices/modal/modal";
export const KoiList = () => {
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleKoiDetailModal = () => {
    dispatch(toggleDetailKoiModal());
    dispatch(toggleKoiHistoryOff());
  };
  return (
    <table className="koi-list-table">
      <thead>
        <tr>
          <td>Infomation</td>
          <td>Type</td>
          <td>Weight</td>
          <td>Size</td>
          <td>Origin</td>
        </tr>
      </thead>
      <tbody>
        <tr onClick={handleToggleKoiDetailModal}>
          <th>
            <img src={image} alt="" />
            <div>
              <strong>Izumiya Koi Fish</strong>
              <p>2 Age</p>
            </div>
          </th>
          <th>Sanke</th>
          <th>2.3kg</th>
          <th>40cm</th>
          <th>Japan</th>
        </tr>
      </tbody>
    </table>
  );
};
