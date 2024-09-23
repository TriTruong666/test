import React from "react";
// import styles
import "../../../styles/dashboard/adminproduct/adminproduct.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { ProductList } from "../../../components/product/ProductList";
export const AdminProductManage = () => {
  return (
    <div className="admin-product-container">
      <Dashnav />
      <div className="admin-product">
        <div className="admin-product-header">
          <strong>Product Manager</strong>
        </div>
        <div className="admin-product-utils">
          <div className="search-product">
            <i className="bx bx-search"></i>
            <input type="text" placeholder="Search product..." />
          </div>
          <div className="filter">
            <select name="" id="">
              <option value="">Filter</option>
              <option value="">By Status</option>
              <option value="">By size</option>
              <option value="">By Number of Koi</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div>
          <div className="add">
            <i className="bx bx-plus"></i>
            <p>Create new product</p>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
};
