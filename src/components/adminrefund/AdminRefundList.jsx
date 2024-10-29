import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/adminrefund/adminrefund.css";
// import service
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
    success: "Approved",
    cancel: "Cancel",
    delivering: "Delivering",
  };

  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

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

  const filteredRefunds = refunds
    .filter((refund) =>
      (refund.refundRequestId || "")
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterBy === "status") {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };
  const handleRefundStatusClassName = (status) => {
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
  useEffect(() => {
    setIsLoadingPage(isLoading || isFetching);
    setIsServerError(isError);
  }, [isLoading, isFetching, isError, refunds]);

  return (
    <>
      <div className="admin-order-utils">
        <div className="search-order">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Search request by ID..."
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
          </select>
          <i className="bx bx-chevron-down"></i>
        </div>
      </div>
      <div className="admin-refund-list">
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
            {filteredRefunds.length === 0 ? (
              <div className="empty-list">
                <p>No request was found</p>
              </div>
            ) : (
              filteredRefunds.map((refund) => (
                <Link
                  key={refund.refundRequestId}
                  to={`/dashboard/admin/refund/detail/${refund.refundRequestId}/${refund.orderId}`}
                >
                  <div>
                    <strong>{refund.refundRequestId}</strong>
                  </div>
                  <span className={handleRefundStatusClassName(refund.status)}>
                    Status: {handleStatusTitle(refund.status)}
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
