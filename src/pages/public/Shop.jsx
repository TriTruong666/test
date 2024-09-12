import React from "react";
// import styles
import "../../styles/shop/shop.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { Shopnav } from "../../components/navbar/Shopnav";
import { Shoplist } from "../../components/shop/Shoplist";
import { Settingnav } from "../../components/navbar/Settingnav";
export const Shop = () => {
  return (
    <div className="shop-container">
      <Navbar />
      <Settingnav />
      <div className="shop">
        <div className="shop-header">
          <strong>IZUMIYA SHOP</strong>
          <p>
            You will find all of best products for your koi from our suppliers.
          </p>
        </div>
        <div className="shop-main">
          <div className="shop-main-header">
            <strong>All Product</strong>
            <div className="header-filter">
              <p>100 products</p>
              <i className="bx bx-grid-horizontal"></i>
              <i className="bx bx-grid-vertical"></i>
              <select name="" id="">
                <option value="">Filter</option>
                <option value="">Filter</option>
                <option value="">Filter</option>
                <option value="">Filter</option>
              </select>
            </div>
          </div>
          <div className="shop-main-list">
            <Shopnav />
            <Shoplist />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
