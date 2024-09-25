import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styles
import "../../styles/components/navbar/navbar.css";
// import assets
import logo from "../../assets/logo.png";
// import dispatch
import { useDispatch } from "react-redux";
// import slices
import { toggleSettingNav } from "../../redux/slices/navbar/navbar";
export const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // handle func
  const handleToggleSettingnav = () => {
    dispatch(toggleSettingNav());
  };
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };
  useEffect(() => {
    handleSetIsAuth();
  }, []);
  return (
    <div className="navbar-container">
      <div className="navbar-main">
        <img src={logo} alt="" onClick={() => navigate("/")} />
        <Link to="/#about">What Is Izumiya?</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/#solution">Solutions</Link>
        <a href="">About</a>
        <a href="">Contact</a>
        <Link to="/blog">Blog</Link>
      </div>
      {isAuth ? (
        <div className="navbar-third">
          <i className="bx bx-cart" onClick={() => navigate("/cart")}></i>
          <div className="info" onClick={handleToggleSettingnav}>
            <strong>{user.fullname}</strong>
            <i className="bx bx-chevron-down"></i>
          </div>
        </div>
      ) : (
        <div className="navbar-second">
          <i className="bx bx-cart"></i>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};
