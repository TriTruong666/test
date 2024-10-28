import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/adminorder/adminorder.css";
// import service
import * as OrderService from "../../service/order/order";
import * as RefundService from "../../service/refund/refund";
export const AdminRefundList = () => {
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
    data: refunds = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["all-refund"],
    queryFn: RefundService.getAllRefundRequest,
  });
  // handle func
  // const filteredRefunds = refunds?.filter((refund) =>
  //   refund.order.orderId.toString().includes(searchTerm)
  // );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setIsLoadingPage(isLoading || isFetching);
    setServerError(isError ? "Server is closed now" : null);
  }, [isLoading, isFetching, isError, refunds]);

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
            placeholder="Search order by ID..."
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
          <></>
        )}
      </div>
    </>
  );
};
