import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from "react-redux";
// import styles
import "../../styles/components/product/product.css";
// import assets
import image from "../../assets/koiproduct.png";
// import service
import * as ProductService from "../../service/product/productService";
// import slices
import { toggleUpdateProductModal } from "../../redux/slices/modal/modal";
import { setProductId } from "../../redux/slices/product/product";
export const ProductList = () => {
  // dispatch
  const dispatch = useDispatch();
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [propProductId, setPropProductId] = useState(null);
  // query
  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: ProductService.getAllProductAdmin,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (products.length === 0) {
      setEmptyList("Product list is empty");
    } else {
      setEmptyList(null);
    }
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
  }, [isFetching, isRefetching, isLoading]);
  // handle func
  const handleToggleUpdateProductModal = (id) => {
    dispatch(setProductId(id));
    dispatch(toggleUpdateProductModal());
  };

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
        {isLoadingPage ? (
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
        ) : (
          <>
            {emptyList && (
              <div className="empty-list">
                <p>{emptyList}</p>
              </div>
            )}
            {products.map((product) => (
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
                <td>${product.unitPrice}</td>
                <td>{product.stock}</td>
                <td>{product.status ? "Active" : "Inactive"}</td>
                <td>
                  <i
                    className="bx bxs-edit-alt"
                    onClick={() =>
                      handleToggleUpdateProductModal(product.productId)
                    }
                  ></i>
                  <i className="bx bxs-trash-alt"></i>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};
