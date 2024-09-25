import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import * as ProductService from "../../service/product/productService";
// import styles
import "../../styles/productdetail/productdetail.css";
// import components
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
import koiproduct from "../../assets/koiproduct.png";
// convert to plain text
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
export const ProductDetail = () => {
  const { productId } = useParams();
  const numericProductId = parseInt(productId);
  const {
    data: product = {},
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["productDetail", numericProductId],
    queryFn: () => ProductService.detailProductService(numericProductId),
    refetchOnWindowFocus: false,
  });
  const plainTextDescription = stripHtmlTags(product.description);
  return (
    <div className="product-detail-container">
      <Navbar />
      <Settingnav />
      <div className="product-detail">
        <div className="product-detail-main">
          <img src={product.image} alt="" />
          <div className="product-detail-content">
            <small>Koi Food</small>
            <h2>{product.productName}</h2>
            <strong>${product.unitPrice}</strong>
            <p>{plainTextDescription}</p>
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
