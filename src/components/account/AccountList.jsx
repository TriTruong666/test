import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/account/account.css";
// import service
import * as AccountService from "../../service/account/AccountService";
export const AccountList = () => {
  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  // query
  const {
    data: users = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: AccountService.getUserListAdmin,
  });
  // handle func
  useEffect(() => {
    if (isLoading || isFetching) {
      setIsLoadingPage(true);
    } else {
      setIsLoadingPage(false);
    }
  }, [isLoading, isFetching]);
  return (
    <table className="account-list-table">
      <thead>
        <tr>
          <th>No</th>
          <th>User</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {isLoadingPage ? (
          <>
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          </>
        ) : (
          <>
            {users.map((user, index) => (
              <tr key={user.userId}>
                <td>{index + 1}</td>
                <td>
                  <i className="bx bx-user"></i>
                  <div>
                    <strong>{user.fullname}</strong>
                    <p>{user.email}</p>
                  </div>
                </td>
                <td>{user.phone || "NULL"}</td>
                <td>{user.address || "NULL"}</td>
                <td>{user.role}</td>
                <td>
                  <i className="bx bxs-edit-alt"></i>
                  <i className="bx bxs-trash-alt"></i>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};
