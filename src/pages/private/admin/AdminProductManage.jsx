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

export const AdminProductManage = () => {
  const isToggleAddProductModal = useSelector(
    (state) => state.modal.addProductModal.isToggleModal
  );
  const isToggleUpdateProductModal = useSelector(
    (state) => state.modal.updateProductModal.isToggleModal
  );
  const isToggleDeleteProductModal = useSelector(
    (state) => state.modal.deleteProductModal.isToggleModal
  );

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

        <ProductList />
      </div>
    </div>
  );
};
