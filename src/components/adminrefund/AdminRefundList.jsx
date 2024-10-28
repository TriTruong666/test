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
  const filteredRefunds = refunds?.filter((refund) =>
    refund.orderId.toString().includes(searchTerm)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
    setServerError(isError ? "Server is closed now" : null);
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
      </div>
      <div className="admin-refund-list">
        {isLoadingPage ? (
          <div className="loading">
            <ClipLoader color="#000000" size={40} />
          </div>
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
