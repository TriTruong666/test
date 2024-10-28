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
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
  const filteredOrders = orders.filter((order) =>
    (order.order.fullname || "")
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

  useEffect(() => {
    setIsLoadingPage(isLoading || isFetching);
    setServerError(isError ? "Server is closed now" : null);
    setEmptyList(orders && orders.length === 0 ? "Empty order list" : null);
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
      </div>
      <div className="admin-order-list">
        {isLoadingPage ? (
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
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
