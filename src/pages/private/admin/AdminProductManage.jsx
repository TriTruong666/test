import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import styles
import "../../../styles/dashboard/adminproduct/adminproduct.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
import { ProductList } from "../../../components/product/ProductList";
import { AddProduct } from "../../../components/modal/AddProduct";
// import slices
import { toggleAddProductModal } from "../../../redux/slices/modal/modal";
export const AdminProductManage = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const isToggleAddProductModal = useSelector(
    (state) => state.modal.addProductModal.isToggleModal
  );
  const handleToggleAddProductModal = () => {
    dispatch(toggleAddProductModal());
  };
  return (
    <div className="admin-product-container">
      <Dashnav />
      {isToggleAddProductModal && <AddProduct />}
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
          <div className="add" onClick={handleToggleAddProductModal}>
            <i className="bx bx-plus"></i>
            <p>Create new product</p>
          </div>
        </div>
        <ProductList />
      </div>
    </div>
  );
};
