import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as ProductService from "../../service/product/productService";
// import styles
import "../../styles/productdetail/productdetail.css";
// import components
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import assets
import koiproduct from "../../assets/koiproduct.png";
// convert to plain text
const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
export const ProductDetail = () => {
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
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
  useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
      document.title = product && product.productName;
    }

    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }



  }, [isFetching,isError]);
  return (
    <div className="product-detail-container">
      <Navbar />
      <Settingnav />
      <div className="product-detail">
        <div className="product-detail-main">
        {serverError ? (
        <>
          <div className="error-page">
            <p>Server is closed now</p>
          </div>
        </>
      ) :(
        <>
          {isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#ffffff" size={50} />
            </div>
          ) : (
            <>
              <img src={product.image} alt="" />
              <div className="product-detail-content">
                <small>{product.category && product.category.cateName}</small>
                <h2>{product.productName}</h2>
                <strong>${product.unitPrice}</strong>
                <p>{plainTextDescription}</p>
                <div>
                  <button>BUY PRODUCT</button>
                  <button>ADD TO CART</button>
                </div>
              </div>
            </>
          )}
        </>
      )}
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
