import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/product/product.css";
// import service
import * as ProductService from "../../service/product/productService";
// import slices
import {
  toggleAddProductModal,
  toggleDeleteProductModal,
  toggleUpdateProductModal,
} from "../../redux/slices/modal/modal";
import { setProductId } from "../../redux/slices/product/product";

export const ProductList = () => {
  const dispatch = useDispatch();
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // query
  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: ProductService.getAllProductAdmin,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }

    setIsLoadingPage(isFetching || isLoading);
  }, [isFetching, isLoading, isError]);

  const filteredProducts = products
    .filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterBy === "stock") {
        return a.stock - b.stock;
      } else if (filterBy === "name") {
        return a.productName.localeCompare(b.productName);
      } else if (filterBy === "price") {
        return a.unitPrice - b.unitPrice;
      }
      return 0;
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleToggleUpdateProductModal = (id) => {
    dispatch(setProductId(id));
    dispatch(toggleUpdateProductModal());
  };
  const handleToggleAddProductModal = () => {
    dispatch(toggleAddProductModal());
  };
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  return (
    <>
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
          <select
            name="filterBy"
            id="filterBy"
            value={filterBy}
            onChange={handleFilterChange}
          >
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
          {serverError ? (
            <div className="error-page">
              <p>{serverError}</p>
            </div>
          ) : isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="empty-list">
              <p>No products were found!</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>
                  <i className="bx bxs-package"></i>
                  <div>
                    <strong>{product.productName}</strong>
                    <p>{product.category && product.category.cateName}</p>
                  </div>
                </td>
                <td>
                  <img src={product.image} alt="" />
                </td>
                <td>{formatPrice(product.unitPrice)}</td>
                <td>{product.stock}</td>
                <td>{product.status ? "Active" : "Inactive"}</td>
                <td>
                  <i
                    className="bx bxs-edit-alt"
                    onClick={() =>
                      handleToggleUpdateProductModal(product.productId)
                    }
                  ></i>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};
