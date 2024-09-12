import React from "react";
// import styles
import "../../../styles/dashboard/pondinfo/pondinfo.css";
// import assets
import image from "../../../assets/logincover2.jpg";
export const PondInfo = () => {
  return (
    <div className="pond-info-container">
      <div className="pond-info-image">
        <img src={image} alt="" />
      </div>
      <div className="pond-info-header">
        <strong>Pond infomation</strong>
        <p>See detail about pond parameter</p>
      </div>
      <div className="pond-info-main">
        <div className="info-item">
          <strong>Name</strong>
          <p>Your Koi Pond Name</p>
        </div>
        <div className="info-item">
          <strong>Pump power</strong>
          <p>200W</p>
        </div>
        <div className="info-item">
          <strong>Size</strong>
          <p>10 x 25m</p>
        </div>
        <div className="info-item">
          <strong>Depth</strong>
          <p>5m</p>
        </div>
        <div className="info-item">
          <strong>Volumn</strong>
          <p>300.000L</p>
        </div>
        <div className="info-item">
          <strong>Veins</strong>
          <p>8</p>
        </div>
      </div>
    </div>
  );
};
