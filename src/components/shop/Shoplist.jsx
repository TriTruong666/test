import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/shop/shop.css";
// import assets
import productImg from "../../assets/koiproduct.png";
export const Shoplist = () => {
  return (
    <div className="shoplist-container">
      <div className="shop-item">
        <img src={productImg} alt="" />
        <Link to="/productdetail">Koi Diet</Link>
        <p>$25.00</p>
        <div>
          <button>Buy now</button>
          <button>Add to cart </button>
        </div>
      </div>
      <div className="shop-item">
        <img src={productImg} alt="" />
        <Link to="/productdetail">Koi DietKoi </Link>
        <p>$25.00</p>
        <div>
          <button>Buy now</button>
          <button>Add to cart </button>
        </div>
      </div>
      <div className="shop-item">
        <img src={productImg} alt="" />
        <Link to="/productdetail">Koi Diet</Link>
        <p>$25.00</p>
        <div>
          <button>Buy now</button>
          <button>Add to cart </button>
        </div>
      </div>
      <div className="shop-item">
        <img src={productImg} alt="" />
        <Link to="/productdetail">Koi Diet</Link>
        <p>$25.00</p>
        <div>
          <button>Buy now</button>
          <button>Add to cart </button>
        </div>
      </div>
    </div>
  );
};
