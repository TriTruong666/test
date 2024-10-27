import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import member from "../../../assets/kois.png";
import { SizeAndWeightChart } from "../../../chart/member/SizeAndWeightChart";
import { Dashnav } from "../../../components/navbar/Dashnav";
import * as BlogService from "../../../service/blog/blogService";
import * as KoiService from "../../../service/koi/koiService";
import * as OrderService from "../../../service/order/order";
import * as PondService from "../../../service/pond/pondService";
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

  const { data: kois = [] } = useQuery({
    queryKey: ["member-kois"],
    queryFn: KoiService.detailKoiService,
  });

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

  const generateKoiLogs = (ponds, newest = true) => {
    if (!ponds?.length) return { logs: [], pondLabel: "" };

    // Sort ponds by creation date or ID to get newest/oldest
    const sortedPonds = ponds.sort((a, b) =>
      newest ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );
    const targetPond = sortedPonds[0];

    if (!targetPond?.kois?.length) return { logs: [], pondLabel: "" };

    const koiLogs = targetPond.kois[0].koiGrowthLogs;
    const pondLabel = newest ? "Newest Pond" : "Oldest Pond";

    return { logs: koiLogs || [], pondLabel };
  };

  const { logs: koiLogs, pondLabel } = generateKoiLogs(ponds, true); // Set 'true' for the newest pond or 'false' for the oldest

  return (
    <div className="homemem-dashboard-container">
      <Dashnav />
      <div className="dashboard">
        <div className="dashboard-header">
          <strong>Home Dashboard</strong>
        </div>
        <div className="section1">
          <div className="item">
            <div className="item1">
              <strong>Welcome back {user.username}</strong>
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
              <h3>Blog Metrics</h3>
            </div>
            <div className="right-chart">
              <h3>Koi Growth and Weight Logs {pondLabel}</h3>
              <SizeAndWeightChart koiGrowthLogs={koiLogs} />
            </div>
          </div>
        </div>
        <div className="summary-bottom">
          <div className="left-bottom">
            <h3>Recent Orders</h3>
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
                    <td>{order.order.orderDetails.length} </td>
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
          </div>

          <div className="right-bottom">
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
        </div>
      </div>
    </div>
  );
};
