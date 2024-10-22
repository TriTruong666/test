import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styles
import "../../../styles/dashboard/adminproduct/adminproduct.css";
// import components
import { AddProduct } from "../../../components/modal/AddProduct";
import { DelProduct } from "../../../components/modal/DelProduct";
import { UpdateProduct } from "../../../components/modal/UpdateProduct";
import { Dashnav } from "../../../components/navbar/Dashnav";
import { ProductList } from "../../../components/product/ProductList";
// import slices
import { toggleAddProductModal } from "../../../redux/slices/modal/modal";

export const AdminProductManage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState(""); // New state for filter

  const isToggleAddProductModal = useSelector(
    (state) => state.modal.addProductModal.isToggleModal
  );
  const isToggleUpdateProductModal = useSelector(
    (state) => state.modal.updateProductModal.isToggleModal
  );
  const isToggleDeleteProductModal = useSelector(
    (state) => state.modal.deleteProductModal.isToggleModal
  );

  const handleToggleAddProductModal = () => {
    dispatch(toggleAddProductModal());
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  return (
    <div className="admin-product-container">
      <Dashnav />
      {isToggleUpdateProductModal && <UpdateProduct />}
      {isToggleAddProductModal && <AddProduct />}
      {isToggleDeleteProductModal && <DelProduct />}
      <div className="admin-product">
        <div className="admin-product-header">
          <strong>Product Manager</strong>
        </div>
        <div className="admin-product-utils">
          <div className="search-product">
            <i className="bx bx-search"></i>
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter">
            <select name="" id="" value={filterBy} onChange={handleFilterChange}>
              <option value="">Filter</option>
              <option value="stock">By Stock</option>
              <option value="name">By Name</option>
              <option value="price">By Price</option>
            </select>
            <i className="bx bx-chevron-down"></i>
          </div>
          <div className="add" onClick={handleToggleAddProductModal}>
            <i className="bx bx-plus"></i>
            <p>Create new product</p>
          </div>
        </div>
        <ProductList searchTerm={searchTerm} filterBy={filterBy} />
      </div>
    </div>
  );
};