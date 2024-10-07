import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import service
import * as CartService from "../../service/cart/cartService";
import * as ProductService from "../../service/product/productService";
// import styles
import "../../styles/components/shop/shop.css";

export const Shoplist = ({
  isLoadingList,
  infinityScroll,
  isRow,
  isColumn,
}) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [serverError, setServerError] = useState(null);
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: ProductService.getAllProductShop,
    refetchOnWindowFocus: false,
  });
  const { data: cartInfo = {} } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
  });
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (cartInfo) {
      setCartId(cartInfo.cartId);
    }

    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isLoading, isFetching, cartInfo, isError]);
  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: ({ cartId, productId, quantity }) =>
      CartService.addToCartByMember(cartId, productId, quantity),
    onSuccess: () => {
      toast.success("Product added", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      queryClient.invalidateQueries(["products"]);
    },
  });

  // handle func
  const handleAddToCart = async (product) => {
    if (user && token && cartId) {
      try {
        await mutation.mutateAsync({
          cartId,
          productId: product.productId,
          quantity: 1,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      CartService.addToCartByGuest(product);
      CartService.getCartByGuest();
    }
  };
  return (
    <div className="shoplist-container">
      <ToastContainer />
      {serverError ? (
        <div className="error-page">
          <p>{serverError}</p>
        </div>
      ) : isLoadingList ? (
        <div className="loading">
          <ClipLoader color="#ffffff" size={40} />
        </div>
      ) : (
        <>
          {isColumn ? (
            <>
              <div className="shoplist-column">
                {products.slice(0, infinityScroll).map((product) => (
                  <div className="shop-item" key={product.productId}>
                    <img src={product.image} alt="image" />
                    <Link to={`/productdetail/${product.productId}`}>
                      {product.productName}
                    </Link>
                    <p>${product.unitPrice}</p>
                    <div>
                      <button>Buy now</button>
                      <button onClick={() => handleAddToCart(product)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            ""
          )}
          {isRow ? (
            <>
              <div className="shoplist-row">
                {products.slice(0, infinityScroll).map((product) => (
                  <div className="shop-item" key={product.productId}>
                    <img src={product.image} alt="image" />
                    <Link to={`/productdetail/${product.productId}`}>
                      {product.productName}
                    </Link>
                    <p>${product.unitPrice}</p>
                    <div>
                      <button>Buy now</button>
                      <button onClick={() => handleAddToCart(product)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};
