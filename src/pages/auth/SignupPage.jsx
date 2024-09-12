import { useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styles
import "../../styles/auth/auth.css";
// import assets
import logo from "../../assets/logo.png";
import coverImg from "../../assets/logincover.jpg";
export const SignupPage = () => {
  // navigate
  const navigate = useNavigate();
  // state
  const [visiblePass, setVisiblePass] = useState(false);
  const [visibleRepass, setVisibleRepass] = useState(false);
  // handlefunc
  const handleVisiblePass = () => {
    setVisiblePass(!visiblePass);
  };
  const handleVisibleRepass = () => {
    setVisibleRepass(!visibleRepass);
  };
  return (
    <div className="signup-container">
      <div className="signup-main">
        <img src={logo} alt="" onClick={() => navigate("/")} />
        <div className="signup-main-header">
          <strong>Get Started Now</strong>
          <p>Let's create an account to access our features</p>
        </div>
        <div className="signup-oauth">
          <i className="bx bxl-google"></i>
          <p>Signup with Google</p>
        </div>
        <div className="or">
          <p>or</p>
        </div>
        <form action="" autoComplete="off" className="signup-form">
          <div className="input-item">
            <label htmlFor="fullname">Fullname</label>
            <div>
              <input type="text" id="fullname" placeholder="Your full name" />
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="username">Username</label>
            <div>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="pass">Password</label>
            <div>
              <input
                type={visiblePass ? "text" : "password"}
                id="pass"
                placeholder="Enter your password"
              />
              {visiblePass ? (
                <span
                  className="material-symbols-outlined"
                  onClick={handleVisiblePass}
                >
                  visibility_off
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={handleVisiblePass}
                >
                  visibility
                </span>
              )}
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="repass">Confirm password</label>
            <div>
              <input
                type={visibleRepass ? "text" : "password"}
                id="repass"
                placeholder="Confirm password again"
              />
              {visibleRepass ? (
                <span
                  className="material-symbols-outlined"
                  onClick={handleVisibleRepass}
                >
                  visibility_off
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={handleVisibleRepass}
                >
                  visibility
                </span>
              )}
            </div>
          </div>
          <input type="submit" value="Create New Account" />
        </form>
        <div className="login-link">
          <p>Already have an account?</p>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
      <div className="signup-intro">
        <img src={coverImg} alt="" />
        <div className="intro">
          <strong>The simplest way to manage your Kois</strong>
          <p>
            Izumiya will bring for you all the best features to make Kois have
            the good life as possible
          </p>
        </div>
      </div>
    </div>
  );
};
