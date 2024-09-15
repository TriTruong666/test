import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/shop/shop.css";
// import assets
import productImg from "../../assets/koiproduct.png";
// import service
import { getAllProduct } from "../../service/product/productService";
export const Shoplist = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProduct();
      console.log(data.data); // Now this will log the resolved data
      setProductList(data.data); // Set the productList state if you want to use it
    };

    fetchProducts(); // Call the async function
  }, []);
  return (
    <div className="shoplist-container">
      {productList.map((product) => {
        return (
          <div className="shop-item" key={product.id}>
            <img src={productImg} alt="" />
            <Link to="/productdetail">{product.name}</Link>
            <p>${product.year}</p>
            <div>
              <button>Buy now</button>
              <button>Add to cart </button>
            </div>
          </div>
        );
      })}
      {/*  */}
      <div className="shop-item">
        <img src={productImg} alt="" />
        <Link to="/productdetail">Koi Diet</Link>
        <p>$25.00</p>
        <div>
          <button>Buy now</button>
          <button>Add to cart </button>
        </div>
      </div>
      <div className="shop-item">
        <img src={productImg} alt="" />
        <Link to="/productdetail">Koi DietKoi </Link>
        <p>$25.00</p>
        <div>
          <button>Buy now</button>
          <button>Add to cart </button>
        </div>
      </div>
      <div className="shop-item">
        <img src={productImg} alt="" />
        <Link to="/productdetail">Koi Diet</Link>
        <p>$25.00</p>
        <div>
          <button>Buy now</button>
          <button>Add to cart </button>
        </div>
      </div>
      <div className="shop-item">
        <img src={productImg} alt="" />
        <Link to="/productdetail">Koi Diet</Link>
        <p>$25.00</p>
        <div>
          <button>Buy now</button>
          <button>Add to cart </button>
        </div>
      </div>
    </div>
  );
};
