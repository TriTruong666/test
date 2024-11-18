import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/myorder/myorder.css";
// import service
import ClipLoader from "react-spinners/ClipLoader";
import * as OrderService from "../../service/order/order";

export const MyOrderList = () => {
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
  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // query
  const {
    data: myOrders = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: OrderService.getOwnOrders,
  });

  // handle func
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
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };
  useEffect(() => {
    if (isFetching || isLoading) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
    if (isError) {
      setServerError("Server is closed now");
    } else {
      setServerError(null);
    }
  }, [isFetching, isLoading, isError, myOrders]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const filteredOrders = myOrders
    .filter((order) =>
      (order.order.fullname || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterBy === "status") {
        return a.order.status.localeCompare(b.order.status);
      } else if (filterBy === "price") {
        return a.order.total - b.order.total;
      }
      return 0;
    });
  return (
    <>
      <div className="order-manage-utils">
        <div className="filter">
          <select
            name="filterBy"
            id="filterBy"
            value={filterBy}
            onChange={handleFilterChange}
          >
            <option value="">Filter</option>
            <option value="status">By Status</option>
            <option value="price">By Order Value</option>
          </select>
          <i className="bx bx-chevron-down"></i>
        </div>
      </div>
      <div className="myorder-list">
        {isLoadingPage ? (
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
        ) : serverError ? (
          <div className="server-error">
            <p>{serverError}</p>
          </div>
        ) : (
          <>
            {filteredOrders.length === 0 ? (
              <div className="empty">
                <p>No orders were found!</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <Link
                  key={order.order?.orderId}
                  to={`/dashboard/myorder/detail/${order.order?.orderId}`}
                >
                  <div>
                    <strong>{formatDate(order.order?.createDate)}</strong>
                    <p>{order.order?.orderDetails?.length || 0} items</p>
                  </div>
                  <p>{formatPrice(order.order?.total || 0)}</p>
                  <span
                    className={handleOrderStatusClassName(order.order?.status)}
                  >
                    Status: {handleStatusTitle(order.order?.status)}
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
