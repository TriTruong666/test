import React from "react";
// import styles
import "../../styles/components/modal/modal.css";
// import chart
import { LineGraph } from "../../chart/Line";
// import slices
import { toggleKoiHistoryModal } from "../../redux/slices/modal/modal";
// import redux
import { useDispatch } from "react-redux";
export const KoiHistory = () => {
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleKoiHistoryModal = () => {
    dispatch(toggleKoiHistoryModal());
  };
  return (
    <div className="koi-history-modal">
      <div className="koi-history-header">
        <strong>Koi History #1233</strong>
        <i className="bx bx-x" onClick={handleToggleKoiHistoryModal}></i>
      </div>
      <div className="koi-history-chart">
        <LineGraph />
      </div>
      <div className="koi-history-main">
        <div className="header">
          <strong>Update History</strong>
          <p>System will show growth history of your Koi</p>
        </div>
        <table className="history">
          <thead>
            <tr>
              <th>No</th>
              <th>Last Update</th>
              <th>Size</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>25 Aug 2023</td>
              <td>60cm</td>
              <td>2.1kg</td>
            </tr>
            <tr>
              <td>1</td>
              <td>25 Aug 2023</td>
              <td>60cm</td>
              <td>2.1kg</td>
            </tr>
            <tr>
              <td>1</td>
              <td>25 Aug 2023</td>
              <td>60cm</td>
              <td>2.1kg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
