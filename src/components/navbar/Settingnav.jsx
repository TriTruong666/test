import { React, useEffect } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/components/navbar/navbar.css";
// import selector
import { useSelector } from "react-redux";
// import dispatch
import { useDispatch } from "react-redux";
// import slices
import { toggleSettingNav } from "../../redux/slices/navbar/navbar";
export const Settingnav = () => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const isToggleSettingnav = useSelector(
    (state) => state.navbar.settingNav.isToggleNav
  );
  // handle func
  const handleToggleSettingnav = () => {
    dispatch(toggleSettingNav());
  };
  return (
    <div
      className={
        isToggleSettingnav
          ? "setting-nav-container"
          : "setting-nav-container-close"
      }
    >
      <div className="setting-nav">
        <div className="setting-nav-header">
          <i className="bx bxs-user-circle"></i>
          <div>
            <strong>Truong Hoang Tri (Admin)</strong>
            <p>tritruonghoang3@gmail.com</p>
          </div>
        </div>
        <div className="setting-nav-list">
          <Link to="/dashboard/admin/order" className="setting-item">
            <i className="bx bxs-dashboard"></i>
            <p>Admin Dashboard</p>
          </Link>
          <Link to="" className="setting-item">
            <i className="bx bxs-package"></i>
            <p>Manage Orders</p>
          </Link>
          <Link to="/dashboard/home" className="setting-item">
            <i className="bx bxs-dashboard"></i>
            <p>Workspace</p>
          </Link>
          <Link to="/dashboard/setting" className="setting-item">
            <i className="bx bxs-cog"></i>
            <p>Your Profile</p>
          </Link>
          <Link to="/dashboard/myorder" className="setting-item">
            <i className="bx bxs-package"></i>
            <p>Your Orders</p>
          </Link>
          <Link to="" className="setting-item">
            <i className="bx bxs-log-out"></i>
            <p>Logout</p>
          </Link>
          <div className="close" onClick={handleToggleSettingnav}>
            <i className="bx bx-x"></i>
            <p>Close Setting</p>
          </div>
        </div>
      </div>
    </div>
  );
};
