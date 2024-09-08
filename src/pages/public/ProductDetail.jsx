import React from "react";
// import styles
import "../../styles/productdetail/productdetail.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
// import assets
import koiproduct from "../../assets/koiproduct.png";

export const ProductDetail = () => {
  return (
    <div className="product-detail-container">
      <Navbar />
      <div className="product-detail">
        <div className="product-detail-main">
          <img src={koiproduct} alt="" />
          <div className="product-detail-content">
            <small>Koi Food</small>
            <h2>Mazuri Koi Diet</h2>
            <strong>$25.00</strong>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              aperiam ratione sint suscipit sit debitis omnis tenetur dolorem
              vitae perferendis, eum porro libero optio, adipisci obcaecati.
              Doloribus maxime esse nam?
            </p>
            <div>
              <button>BUY PRODUCT</button>
              <button>ADD TO CART</button>
            </div>
          </div>
        </div>
        <div className="product-detail-related">
          <strong>Explore Related Products</strong>
          <div className="product-detail-related-list">
            <div className="product-related-item">
              <img src={koiproduct} alt="" />
              <strong>Mazuri Koi Diet</strong>
              <p>$25.00</p>
              <button>Buy now</button>
            </div>
            <div className="product-related-item">
              <img src={koiproduct} alt="" />
              <strong>Mazuri Koi Diet</strong>
              <p>$25.00</p>
              <button>Buy now</button>
            </div>
            <div className="product-related-item">
              <img src={koiproduct} alt="" />
              <strong>Mazuri Koi Diet</strong>
              <p>$25.00</p>
              <button>Buy now</button>
            </div>
            <div className="product-related-item">
              <img src={koiproduct} alt="" />
              <strong>Mazuri Koi Diet</strong>
              <p>$25.00</p>
              <button>Buy now</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
