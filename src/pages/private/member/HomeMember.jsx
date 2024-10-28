import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import member from "../../../assets/kois.png";
//charts
import { SizeAndWeightChart } from "../../../chart/member/SizeAndWeightChart";
import { Dashnav } from "../../../components/navbar/Dashnav";
// Services
import * as BlogService from "../../../service/blog/blogService";
import * as OrderService from "../../../service/order/order";
import * as PondService from "../../../service/pond/pondService";
import * as ProductService from "../../../service/product/productService";
//styles
import "../../../styles/dashboard/home/home.css";

export const HomeMember = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  const statusClassName = {
    pending: "pending",
    success: "success",
    cancel: "cancel",
    delivering: "delivering",
  };
  const statusTitle = {
    pending: "Pending",
    success: "Success",
    cancel: "Cancel",
    delivering: "Delivering",
  };

  //states
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);

  // Queries
  const {
    data: orders = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["member-orders", userId],
    queryFn: OrderService.getOwnOrders,
  });

  const { data: blogs = [] } = useQuery({
    queryKey: ["member-blogs", userId],
    queryFn: () => BlogService.getUserBlogs(userId),
    refetchOnWindowFocus: false,
  });

  const { data: ponds = [] } = useQuery({
    queryKey: ["member-ponds", userId],
    queryFn: () => PondService.getUserPondService(userId),
    refetchOnWindowFocus: false,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["member-products", userId],
    queryFn: ProductService.getAllProductShop,
  });

  const pondStatus = ponds.some((pond) => {
    const status = localStorage.getItem(`pondStatus-${pond.pondId}`);
    return status === "poor" || status === "moderate";
  });

  // Determine recommended products based on pond status
  const recommendedProducts = products.filter((product) => {
    if (!pondStatus) {
      return product.category.cateName === "Koi Health Treatment";
    } else {
      return product.category.cateName === "Water Parameter Improvement";
    }
  });

  // Check if ponds are empty or not found
  const noPondsMessage =
    ponds.length === 0 || pondStatus === null
      ? "You have not created any ponds. Please create ponds to receive product recommendations."
      : null;

  const handleOrderStatusClassName = (status) =>
    statusClassName[status.toLowerCase()];
  const handleStatusTitle = (status) => statusTitle[status.toLowerCase()];

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  useEffect(() => {
    if (isLoading || isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
    if (orders && orders.length === 0) {
      setEmptyList("Empty order list");
    } else {
      setEmptyList(null);
    }
  }, [isLoading, isFetching, isError, orders]);

  const generateKoiLogs = (ponds) => {
    if (!ponds?.length) return { logs: [], pondLabel: "" };

    // Filter ponds with "poor" status stored in localStorage
    const poorStatusPonds = ponds.filter((pond) => {
      const pondStatus = localStorage.getItem(`pondStatus-${pond.pondId}`);
      return pondStatus === "poor";
    });

    if (!poorStatusPonds.length)
      return { logs: [], pondLabel: "No 'Poor' Ponds Found" };

    // Sort filtered ponds by oldest created date
    const sortedPonds = poorStatusPonds.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    const targetPond = sortedPonds[0]; // Get the oldest "poor" pond

    if (!targetPond?.kois?.length)
      return { logs: [], pondLabel: "No Koi Logs" };

    const koiLogs = targetPond.kois[0].koiGrowthLogs;
    return { logs: koiLogs || [], pondLabel: "Oldest Pond with 'Poor' Status" };
  };

  const { logs: koiLogs, pondLabel } = generateKoiLogs(ponds);

  return (
    <div className="homemem-dashboard-container">
      <Dashnav />
      <div className="dashboard">
        {serverError ? (
          <div className="error-page">
            <p>{serverError}</p>
          </div>
        ) : isLoadingPage ? (
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
        ) : (
          <>
            <div className="dashboard-header">
              <strong>Home Dashboard</strong>
            </div>
            <div className="section1">
              <div className="item">
                <div className="item1">
                  <strong>Welcome back {user.fullname}</strong>
                  <p>IZUMIYA is the Simplest Manage System of Koi</p>
                </div>
                <div className="item2">
                  <img src={member} alt="Member" />
                </div>
              </div>

              <div className="info">
                <div className="small-item">
                  <div>
                    <strong>{blogs.length} blogs</strong>
                    <p> Contributed</p>
                  </div>
                  <i className="bx bx-news"></i>
                </div>
                <div className="small-item">
                  <div>
                    <strong>{orders.length}</strong>
                    <p>Total orders</p>
                  </div>
                  <i className="bx bx-package"></i>
                </div>
              </div>
            </div>

            <div className="chart-container">
              <div className="charts">
                <div className="left-chart">
                  <h3>Recommend Products for your ponds</h3>
                  {recommendedProducts.length === 0 ? (
                    <p>You have not created any ponds</p>
                  ) : (
                    <ul className="recommended-products-list">
                      {recommendedProducts.slice(0, 3).map((product) => (
                        <li
                          key={product.productId}
                          className="recommended-product-item"
                        >
                          <img
                            src={product.image}
                            alt={product.productName}
                            className="recommended-product-image"
                          />
                          <div className="recommended-product-details">
                            <strong>{product.productName}</strong>
                            <p>{formatPrice(product.unitPrice)}</p>
                            <Link to={`/productdetail/${product.productId}`}>
                              Details
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="right-chart">
                  <h3>Koi Growth and Weight Logs </h3>
                  <SizeAndWeightChart koiGrowthLogs={koiLogs} />
                </div>
              </div>
            </div>
            <div className="summary-bottom">
              <div className="left-bottom">
                <h3>Recent Orders</h3>
                {orders.length === 0 ? (
                  <div className="no-orders-message">
                    <p>You have not created any orders yet.</p>
                    <Link to="/shop" className="shop-link">
                      Go to Shop
                    </Link>
                  </div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>OrderId</th>
                        <th>Total items</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.order.orderId}>
                          <td>{order.order.orderId}</td>
                          <td>{order.order.orderDetails.length}</td>
                          <td>{formatPrice(order.order.total)}</td>
                          <td>
                            <span
                              className={handleOrderStatusClassName(
                                order.order.status
                              )}
                            >
                              {handleStatusTitle(order.order.status)}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/dashboard/myorder/detail/${order.order.orderId}`}
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="right-bottom">
                {ponds.length === 0 ? (
                  <>
                    <h3>Pond Information</h3>
                    <p>You have not created any ponds.</p>
                  </>
                ) : (
                  <div className="ponds-info">
                    <h3>Pond Information</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Pond Id</th>
                          <th>Pond Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ponds.map((pond) => {
                          const pondStatus = localStorage.getItem(
                            `pondStatus-${pond.pondId}`
                          );
                          return (
                            <tr key={pond.pondId}>
                              <td>{pond.pondId}</td>
                              <td>{pond.pondName}</td>
                              <td className={pondStatus}>{pondStatus}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
