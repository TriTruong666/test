import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/adminorder/adminorder.css";
// import service
import * as OrderService from "../../service/order/order";

export const AdminOrderList = () => {
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

  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // query
  const {
    data: orders = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: OrderService.getAllOrders,
  });

  // handle func
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const filteredOrders = orders
    .filter((order) =>
      (order.order.fullname || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterBy === "status") {
        return a.order.status.localeCompare(b.order.status);
      } else if (filterBy === "name") {
        return a.order.fullname.localeCompare(b.order.fullname);
      } else if (filterBy === "price") {
        return a.order.total - b.order.total;
      }
      return 0;
    });

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

  useEffect(() => {
    setIsLoadingPage(isLoading || isFetching);
    setIsServerError(isError);
  }, [isLoading, isFetching, isError, orders]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  return (
    <>
      <div className="admin-order-utils">
        <div className="search-order">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Search order by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter">
          <select
            name="filterBy"
            id="filterBy"
            value={filterBy}
            onChange={handleFilterChange}
          >
            <option value="">Filter</option>
            <option value="status">By Status</option>
            <option value="name">By Name</option>
            <option value="price">By Price</option>
          </select>
          <i className="bx bx-chevron-down"></i>
        </div>
      </div>
      <div className="admin-order-list">
        {isLoadingPage ? (
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
        ) : isServerError ? (
          <>
            <div className="server-error">
              <p>Server is closed now</p>
            </div>
          </>
        ) : (
          <>
            {filteredOrders.length === 0 ? (
              <div className="empty-list">
                <p>No order was found</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <Link
                  key={order.order.orderId}
                  to={`/dashboard/admin/order/detail/${order.order.orderId}`}
                >
                  <div>
                    <strong>{order.order.fullname}'s Order</strong>
                    <p>{order.order.orderDetails.length} items</p>
                  </div>
                  <p>{formatPrice(order.order.total)}</p>
                  <span
                    className={handleOrderStatusClassName(order.order.status)}
                  >
                    Status: {handleStatusTitle(order.order.status)}
                  </span>
                </Link>
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};
