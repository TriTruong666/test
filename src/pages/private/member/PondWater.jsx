import React from "react";
// import styles
import "../../../styles/dashboard/pondwater/pondwater.css";
// import assets
export const PondWater = () => {
  return (
    <div className="pond-water-container">
      <div className="pond-water-header">
        <div className="header">
          <strong>Water quality</strong>
          <p>View detail all parameters of water quality</p>
        </div>
        <div className="update-water">
          <i className="bx bx-plus"></i>
          <p>Update water quality</p>
        </div>
      </div>
      <div className="pond-water-list">
        <div className="pond-water-param">
          <strong>Lastest update</strong>
          <p>20/10/2024</p>
        </div>
        <div className="pond-water-param">
          <strong>O2</strong>
          <p>5.0mg/L</p>
        </div>
        <div className="pond-water-param">
          <strong>NO2</strong>
          <p>5.0mg/L</p>
        </div>
        <div className="pond-water-param">
          <strong>NO3</strong>
          <p>5.0mg/L</p>
        </div>
        <div className="pond-water-param">
          <strong>NH3/NH4</strong>
          <p>5.0mg/L</p>
        </div>
        <div className="pond-water-param">
          <strong>Temparature</strong>
          <p>24℃</p>
        </div>
        <div className="pond-water-param">
          <strong>Salt</strong>
          <p>0.1%</p>
        </div>
        <div className="pond-water-param">
          <strong>pH</strong>
          <p>6.9</p>
        </div>
      </div>
      <div className="pond-water-recommendation-header">
        <strong>Recommendation</strong>
        <p>Let’s our system calculate ideal water parameter for your ponds</p>
      </div>
      <div className="pond-water-recommendation">
        <div className="recommendation-param critical">
          <strong>Salt (Critical)</strong>
          <p>Less 0.1%</p>
        </div>
      </div>
    </div>
  );
};
