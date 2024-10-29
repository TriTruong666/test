import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
// import styles
import "../../styles/components/account/account.css";
// import service
import * as AccountService from "../../service/account/AccountService";
// import slices
import { setUserId } from "../../redux/slices/account/account";
import {
  toggleAccountModal,
  toggleDeleteAccountModal,
  toggleUnlockAccountModal,
} from "../../redux/slices/modal/modal";

export const AccountList = () => {
  // dispatch
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const ownUserId = user.userId;

  // state
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitData, setSubmitData] = useState({
    status: true,
  });
  // query
  const {
    data: users = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: AccountService.getUserListAdmin,
    refetchOnWindowFocus: false,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle func
  const handleToggleDelAccountModal = (userId) => {
    dispatch(setUserId(userId));
    dispatch(toggleDeleteAccountModal());
  };
  const handleToggleUnlockAccountModal = (userId) => {
    dispatch(setUserId(userId));
    dispatch(toggleUnlockAccountModal());
  };
  const handleToggleAddAccountModal = () => {
    dispatch(toggleAccountModal());
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
  }, [isLoading, isFetching, isError]);

  return (
    <>
      <div className="admin-account-utils">
        <div className="search-account">
          <i className="bx bx-search"></i>
          <input
            type="text"
            placeholder="Search account..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="add" onClick={handleToggleAddAccountModal}>
          <i className="bx bx-plus"></i>
          <p>Create new account</p>
        </div>
      </div>
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
          {serverError ? (
            <div className="error-page">
              <p>{serverError}</p>
            </div>
          ) : isLoadingPage ? (
            <div className="loading">
              <ClipLoader color="#000000" size={40} />
            </div>
          ) : (
            filteredUsers.map((user, index) => (
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
                {!user.status ? (
                  <>
                    <td>
                      <i
                        className="bx bx-lock-open-alt"
                        onClick={() =>
                          handleToggleUnlockAccountModal(user.userId)
                        }
                      ></i>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {user.role === "ADMIN" ? (
                        ""
                      ) : (
                        <i
                          className="bx bx-block"
                          onClick={() =>
                            handleToggleDelAccountModal(user.userId)
                          }
                        ></i>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};
