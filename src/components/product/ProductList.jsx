import React from "react";
// import styles
import "../../styles/components/product/product.css";
// import assets
import image from "../../assets/koiproduct.png";
export const ProductList = () => {
  return (
    <table className="product-list-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>112345</td>
          <td>
            <i className="bx bxs-package"></i>
            <div>
              <strong>Mazuri Koi Diet</strong>
              <p>Food</p>
            </div>
          </td>
          <td>
            <img src={image} alt="" />
          </td>
          <td>$35.00</td>
          <td>50</td>
          <td>Active</td>
          <td>
            <i className="bx bxs-edit-alt"></i>
            <i className="bx bxs-trash-alt"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
