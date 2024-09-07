import { useState, React } from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/auth/auth.css";
// import assets
import coverImg from "../../assets/logincover2.jpg";
import logo from "../../assets/logo.png";
// import components
import { LoginSuccess } from "../../components/modal/LoginSuccess";
export const LoginPage = () => {
  // state
  const [visiblePass, setVisiblePass] = useState(false);
  const [testLogin, setTestLogin] = useState(false);
  // handlefunc
  const handleVisiblePass = () => {
    setVisiblePass(!visiblePass);
  };
  const handleTestLogin = () => {
    setTestLogin(true);
  };
  return (
    <div className="cover">
      {testLogin && <LoginSuccess />}
      <img src={coverImg} alt="" />
      <div className="login-container">
        <div className="login-main">
          <div className="login-header">
            <img src={logo} alt="" />
            <div>
              <strong>Welcome Back</strong>
              <p>Enter your credentials to access your account</p>
            </div>
          </div>
          <form action="" className="login-form" autoComplete="off">
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
            <Link to="/forget">Forget password?</Link>
            <input type="submit" value="Login To Izumiya" />
          </form>
          <div className="or">
            <p>or</p>
          </div>
          <div className="oauth" onClick={handleTestLogin}>
            <i className="bx bxl-google"></i>
            <p>Login with Google</p>
          </div>
          <div className="signup-link">
            <p>Don't have an account?</p>
            <Link to="/signup">Create A New</Link>
          </div>
        </div>
        <div className="login-right">
          <h2 className="type-writer line">Izumiya Koi</h2>
          <p>
            "The vibrant colors of koi fish represent beauty, harmony, and a
            peaceful coexistence with nature, inspiring us to seek balance in
            our own lives."
          </p>
        </div>
      </div>
    </div>
  );
};
