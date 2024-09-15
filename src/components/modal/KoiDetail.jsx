import React from "react";
// import styles
import "../../styles/components/modal/modal.css";
// import assets
import image from "../../assets/logincover2.jpg";
export const KoiDetail = () => {
  return (
    <div className="koi-detail-container">
      <div className="koi-detail-modal">
        <div className="koi-detail-header">
          <strong>Koi Detail #1233</strong>
          <i className="bx bx-x"></i>
        </div>
        <div className="koi-detail-info">
          <img src={image} alt="" />
          <div className="koi-detail-info-header">
            <div>
              <strong>Koi Infomation</strong>
              <p>View all infomation of your koi</p>
            </div>
            <span>View info history</span>
          </div>
          <div className="koi-detail-main">
            <div className="koi-info">
              <strong>First date in pond</strong>
              <p>26 Aug 2022</p>
            </div>
            <div className="koi-info">
              <strong>Name</strong>
              <p>Your Koi Name</p>
            </div>
            <div className="koi-info">
              <strong>Size</strong>
              <p>40cm</p>
            </div>
            <div className="koi-info">
              <strong>Weight</strong>
              <p>2.3kg</p>
            </div>
            <div className="koi-info">
              <strong>Type</strong>
              <p>Sanke</p>
            </div>
            <div className="koi-info">
              <strong>Origin</strong>
              <p>JP</p>
            </div>
          </div>
          <div className="koi-detail-recommendation">
            <div className="koi-recommendation-header">
              <strong>Recommendation</strong>
              <p>Our system will calculate how many food based on Koi Age</p>
            </div>
            <div className="recommendation">
              <div className="koi-food">
                <strong>Amount of food (% of Koi Weight)</strong>
                <p>1%</p>
              </div>
              <span>
                A diet consisting of lower protein pellets, around 25-35%, is
                appropriate, supplemented with vegetables and fruits such as
                watermelon, lettuce, or citrus slices. Adult koi should be fed
                once or twice daily, depending on their activity level and water
                temperature.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
