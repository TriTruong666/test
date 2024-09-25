import { useQuery } from "@tanstack/react-query";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as ProductService from "../../service/product/productService";
import "../../styles/components/shop/shop.css";

export const Shoplist = () => {
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const {
    data: products = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: ProductService.getAllProduct,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFetching) {
      setIsLoadingPage(true);
      setTimeout(() => {
        setIsLoadingPage(false);
      }, 1500);
    }
  }, [isLoading, isFetching]);

  if (isError) {
    return <p>Error fetching products. Please try again later.</p>;
  }

  return (
    <div className="shoplist-container">
      {isLoadingPage ? (
        <div className="loading">
          <ClipLoader color="#ffffff" size={50} />
        </div>
      ) : (
        <div className="shoplist">
          {products.map((product) => (
            <div className="shop-item" key={product.productId}>
              <img src={product.image} alt="image" />
              <Link to={`/productdetail/${product.productId}`}>
                {product.productName}
              </Link>
              <p>${product.unitPrice}</p>
              <div>
                <button>Buy now</button>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
