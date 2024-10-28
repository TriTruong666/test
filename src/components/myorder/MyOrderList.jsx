import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/myorder/myorder.css";
// import service
import * as OrderService from "../../service/order/order";
import ClipLoader from "react-spinners/ClipLoader";

export const MyOrderList = () => {
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

  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [emptyList, setEmptyList] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    if (status === "DELIVERING") return statusClassName.delivering;
  };

  const handleStatusTitle = (status) => {
    if (status === "PENDING") return statusTitle.pending;
    if (status === "APPROVED") return statusTitle.success;
    if (status === "REJECTED") return statusTitle.cancel;
    if (status === "DELIVERING") return statusTitle.delivering;
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    if (myOrders && myOrders.length === 0) {
      setEmptyList("Your orders are empty");
    } else {
      setEmptyList(null);
    }
  }, [isFetching, isLoading, isError, myOrders]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);

  const filteredOrders = myOrders.filter((order) =>
    order.order?.orderId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="order-manage-utils">
        <div className="search-order">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Search order by ID..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
        ) : emptyList ? (
          <div className="empty">
            <p>{emptyList}</p>
          </div>
        ) : (
          <>
            {filteredOrders.length === 0 ? (
              <div className="empty">
                <p>No orders match your search</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <Link
                  key={order.order?.orderId}
                  to={`/dashboard/myorder/detail/${order.order?.orderId}`}
                >
                  <div>
                    <strong>{order.order?.orderId}</strong>
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
