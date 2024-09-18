import React from "react";
// import styles
import "../../styles/components/account/account.css";
export const AccountList = () => {
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
        <tr>
          <td>1</td>
          <td>
            <i className="bx bx-user"></i>
            <div>
              <strong>Truong Hoang Tri</strong>
              <p>tritruonghoang3@gmail.com</p>
            </div>
          </td>
          <td>0123124124</td>
          <td>1234 Nam Chau, P11, Tan Binh, TPHCM</td>
          <td>Admin</td>
          <td>
            <i className="bx bxs-edit-alt"></i>
            <i className="bx bxs-trash-alt"></i>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
