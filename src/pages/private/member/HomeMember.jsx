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
    refund: "refund",
  };
  const statusTitle = {
    pending: "Pending",
    success: "Success",
    cancel: "Cancel",
    refund: "Refunded",
  };

  const handleOrderStatusClassName = (status) => {
    if (status === "PENDING") return statusClassName.pending;
    if (status === "APPROVED") return statusClassName.success;
    if (status === "REJECTED") return statusClassName.cancel;
    if (status === "REFUNDED") return statusClassName.refund;
  };

  const handleStatusTitle = (status) => {
    if (status === "PENDING") return statusTitle.pending;
    if (status === "APPROVED") return statusTitle.success;
    if (status === "REJECTED") return statusTitle.cancel;
    if (status === "REFUNDED") return statusTitle.refund;
  };

  //states
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [pondName, setPondName] = useState("");
  const [koiName, setKoiName] = useState("");
  const [koiLogs, setKoiLogs] = useState([]);
  const [pondLabel, setPondLabel] = useState("");

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

  const recommendedProducts = products.filter((product) => {
    if (!pondStatus) {
      return product.category.cateName === "Koi Health Treatment";
    } else {
      return product.category.cateName === "Water Parameter Improvement";
    }
  });

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  const handleSearchKoi = () => {
    const trimmedPondName = pondName.trim().toLowerCase();
    const pond = ponds.find(
      (pond) => pond.pondName.toLowerCase() === trimmedPondName
    );

    if (!pond) {
      setPondLabel("Pond not found");
      setKoiLogs([]);
      return;
    }

    const koi = pond.kois.find(
      (koi) => koi.name.toLowerCase() === koiName.toLowerCase()
    );
    if (!koi) {
      setPondLabel(`${koiName} not found in the pond with name: ${pondName}`);
      setKoiLogs([]);
      return;
    }

    setKoiLogs(koi.koiGrowthLogs);
    setPondLabel(`Koi Growth Logs for ${koi.name} in Pond ${pondName}`);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

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
  }, [isLoading, isFetching, isError, orders]);

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
                  <i className="bx bx-smile"></i>
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
            <div className="summary-bottom">
              <div className="left-bottom">
                <h3>Recent Orders</h3>
                {orders.length === 0 ? (
                  <div className="no-orders-message">
                    <p>You have not created any orders yet.</p>
                    <Link to="/shop" className="shop-link">
                      Shop now
                      <i className="bx bx-cart"></i>
                    </Link>
                  </div>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Order Date</th>
                        <th>Total items</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.order.orderId}>
                          <td>{formatDate(order.order.createDate)}</td>
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
                              style={{ color: "blue", fontSize: "1rem" }}
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
                        {ponds.slice(0, 5).map((pond) => (
                          <tr key={pond.pondId}>
                            <td>{pond.pondId}</td>
                            <td>{pond.pondName}</td>
                            <td>
                              <Link
                                style={{ color: "green", fontSize: "1rem" }}
                                to={`/dashboard/mypond/detail/info/${pond.pondId}`}
                              >
                                Details
                              </Link>
                            </td>
                          </tr>
                        ))}
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
