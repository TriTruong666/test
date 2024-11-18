import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import service
import * as CartService from "../../service/cart/cartService";
import * as CategoryService from "../../service/category/categoryService";
import * as ProductService from "../../service/product/productService";
// import styles
import "../../styles/components/shop/shop.css";

export const Shoplist = ({
  isLoadingList,
  infinityScroll,
  isRow,
  isColumn,
  filterOption,
}) => {
  // param
  const { cateId } = useParams();
  //
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId || null;
  // state
  const [isPreventSubmit, setIsPreventSubmit] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [productFromCate, setProductFromCate] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [serverError, setServerError] = useState(null);
  // query
  const {
    data: products = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["products", cateId],
    queryFn: () =>
      cateId
        ? CategoryService.getProductCategory(cateId)
        : ProductService.getAllProductShop(),
    refetchOnWindowFocus: false,
  });
  const { data: cartInfo = {} } = useQuery({
    queryKey: ["my-cart", userId],
    queryFn: () => CartService.getCartByMember(userId),
  });
  const { data: cateList = [] } = useQuery({
    queryKey: ["category"],
    queryFn: CategoryService.getAllCategory,
  });

  // use effect
  useEffect(() => {
    if (cartInfo) {
      setCartId(cartInfo.cartId);
    }

    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
    if (cateId) {
      setProductFromCate(
        Array.isArray(products?.products) ? products.products : []
      );
    } else {
      return;
    }
  }, [isLoading, isFetching, cartInfo, isError]);

  // mutation
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: ({ cartId, productId, quantity }) =>
      CartService.addToCartByMember(cartId, productId, quantity),
    onMutate: () => {
      setIsPreventSubmit(true);
    },
    onSuccess: (response) => {
      if (response?.code === "QUANTITY_GREATER_THAN_STOCK") {
        toast.error("Sorry, our stock is not enough!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsPreventSubmit(false);
      } else {
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
        setIsPreventSubmit(false);
      }
    },
  });
  const debounce = (func, delay) => {
    let debounceTimer;
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // handle func
  const handleAddToCart = debounce(async (product) => {
    try {
      await mutation.mutateAsync({
        cartId,
        productId: product.productId,
        quantity: 1,
      });
    } catch (error) {
      console.error(error);
    }
  }, 100);

  const handleSearching = (e) => {
    setSearchData(e.target.value);
  };

  const applyFilter = (products) => {
    switch (filterOption) {
      case "priceLowToHigh":
        return [...products].sort((a, b) => a.unitPrice - b.unitPrice);
      case "priceHighToLow":
        return [...products].sort((a, b) => b.unitPrice - a.unitPrice);
      default:
        return products;
    }
  };

  const filteredProducts = cateId
    ? applyFilter(
        Array.isArray(productFromCate)
          ? productFromCate.filter((product) =>
              product?.productName
                .toLowerCase()
                .includes(searchData.toLowerCase())
            )
          : []
      )
    : applyFilter(
        Array.isArray(products)
          ? products.filter((product) =>
              product?.productName
                .toLowerCase()
                .includes(searchData.toLowerCase())
            )
          : []
      );

  // calculator
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  return (
    <>
      {products.length === 0 ? (
        <>
          <div className="empty-shop">
            <p>Sorry, our products is empty or out of stock</p>
          </div>
        </>
      ) : (
        <>
          <div className="shopnav-container">
            <nav className="shopnav">
              <div className="shopnav-item">
                <strong>Search</strong>
                <input
                  type="text"
                  placeholder="Search for product name..."
                  value={searchData}
                  onChange={handleSearching}
                />
              </div>
              <div className="shopnav-item">
                <strong>Category</strong>
                <div className="shopnav-item-link">
                  <Link to="/shop">All Products</Link>
                  {cateList.map((category) => (
                    <Link
                      to={`/shop/category/${category.cateId}`}
                      key={category.cateId}
                    >
                      {category.cateName}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <div className="shoplist-container">
            <ToastContainer />
            {serverError ? (
              <div className="error-page">
                <p>{serverError}</p>
              </div>
            ) : (
              <>
                {filteredProducts.length === 0 ? (
                  <>
                    <div className="empty-search">
                      <p>Product you are looking for is not found</p>
                    </div>
                  </>
                ) : (
                  <>
                    {cateId ? (
                      <>
                        {isColumn && (
                          <div className="shoplist-column">
                            {filteredProducts
                              .slice(0, infinityScroll)
                              .map((product) => (
                                <div
                                  className="shop-item"
                                  key={product.productId}
                                >
                                  <Link
                                    to={`/productdetail/${product.productId}`}
                                  >
                                    <img src={product.image} alt="image" />
                                  </Link>
                                  <Link
                                    to={`/productdetail/${product.productId}`}
                                  >
                                    {product.productName}
                                  </Link>
                                  <p>{formatPrice(product.unitPrice)}</p>
                                  <div>
                                    {user && token ? (
                                      <>
                                        <Link
                                          className="buynow"
                                          to={`/buynow/${product.productId}`}
                                        >
                                          Buy now
                                        </Link>
                                        <button
                                          disabled={isPreventSubmit}
                                          onClick={() =>
                                            handleAddToCart(product)
                                          }
                                        >
                                          Add to cart
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <Link
                                          className="login-first"
                                          to="/login"
                                        >
                                          You have to login first
                                        </Link>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                        {isRow && (
                          <div className="shoplist-row">
                            {filteredProducts
                              .slice(0, infinityScroll)
                              .map((product) => (
                                <div
                                  className="shop-item"
                                  key={product.productId}
                                >
                                  <Link
                                    to={`/productdetail/${product.productId}`}
                                  >
                                    <img src={product.image} alt="image" />
                                  </Link>
                                  <Link
                                    to={`/productdetail/${product.productId}`}
                                  >
                                    {product.productName}
                                  </Link>
                                  <p>{formatPrice(product.unitPrice)}</p>
                                  <div>
                                    {user && token ? (
                                      <>
                                        <Link
                                          className="buynow"
                                          to={`/buynow/${product.productId}`}
                                        >
                                          Buy now
                                        </Link>
                                        <button
                                          disabled={isPreventSubmit}
                                          onClick={() =>
                                            handleAddToCart(product)
                                          }
                                        >
                                          Add to cart
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <Link
                                          className="login-first"
                                          to="/login"
                                        >
                                          You have to login first
                                        </Link>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {isColumn && (
                          <div className="shoplist-column">
                            {filteredProducts
                              .slice(0, infinityScroll)
                              .map((product) => (
                                <div
                                  className="shop-item"
                                  key={product.productId}
                                >
                                  <Link
                                    to={`/productdetail/${product.productId}`}
                                  >
                                    <img src={product.image} alt="image" />
                                  </Link>
                                  <Link
                                    to={`/productdetail/${product.productId}`}
                                  >
                                    {product.productName}
                                  </Link>
                                  <p>{formatPrice(product.unitPrice)}</p>
                                  <div>
                                    {user && token ? (
                                      <>
                                        <Link
                                          className="buynow"
                                          to={`/buynow/${product.productId}`}
                                        >
                                          Buy now
                                        </Link>
                                        <button
                                          disabled={isPreventSubmit}
                                          onClick={() =>
                                            handleAddToCart(product)
                                          }
                                        >
                                          Add to cart
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <Link
                                          className="login-first"
                                          to="/login"
                                        >
                                          You have to login first
                                        </Link>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                        {isRow && (
                          <div className="shoplist-row">
                            {filteredProducts
                              .slice(0, infinityScroll)
                              .map((product) => (
                                <div
                                  className="shop-item"
                                  key={product.productId}
                                >
                                  <Link
                                    to={`/productdetail/${product.productId}`}
                                  >
                                    <img src={product.image} alt="image" />
                                  </Link>
                                  <Link
                                    to={`/productdetail/${product.productId}`}
                                  >
                                    {product.productName}
                                  </Link>
                                  <p>{formatPrice(product.unitPrice)}</p>
                                  <div>
                                    {user && token ? (
                                      <>
                                        <Link
                                          className="buynow"
                                          to={`/buynow/${product.productId}`}
                                        >
                                          Buy now
                                        </Link>
                                        <button
                                          disabled={isPreventSubmit}
                                          onClick={() =>
                                            handleAddToCart(product)
                                          }
                                        >
                                          Add to cart
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <Link
                                          className="login-first"
                                          to="/login"
                                        >
                                          You have to login first
                                        </Link>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
