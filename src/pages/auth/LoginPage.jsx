import { useState, React, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import styles
import "../../styles/auth/auth.css";
// import assets
import coverImg from "../../assets/logincover2.jpg";
import logo from "../../assets/logo.png";
// import components
// import { LoginSuccess } from "../../components/modal/LoginSuccess";
// selector redux
// import { useSelector } from "react-redux";
// dispatch redux
import { useDispatch } from "react-redux";
// import slices
import { toggleLoginModal } from "../../redux/slices/modal/modal";
// import service
import * as AccountService from "../../service/account/AccountService";
export const LoginPage = () => {
  // navigate
  const navigate = useNavigate();
  // dispatch
  const dispatch = useDispatch();
  // state
  const [visiblePass, setVisiblePass] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // mutation
  const queryCilent = useQueryClient();
  const mutation = useMutation({
    mutationFn: AccountService.loginService,
    onSuccess: () => {
      queryCilent.invalidateQueries({
        queryKey: ["login"],
      });
    },
  });
  // handlefunc
  const handleOnChangeForm = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(loginData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleVisiblePass = () => {
    setVisiblePass(!visiblePass);
  };
  useEffect(() => {
    console.log(loginData);
  }, [loginData]);
  return (
    <div className="cover">
      {/* {loginModalStatus && <LoginSuccess />} */}
      <img src={coverImg} alt="" />
      <div className="login-container">
        <div className="login-main">
          <div className="login-header">
            <img src={logo} alt="" onClick={() => navigate("/")} />
            <div>
              <strong>Welcome Back</strong>
              <p>Enter your credentials to access your account</p>
            </div>
          </div>
          <form
            action=""
            onSubmit={handleSubmitForm}
            className="login-form"
            autoComplete="off"
          >
            <div className="input-item">
              <label htmlFor="email">Email</label>
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleOnChangeForm}
                />
              </div>
            </div>
            <div className="input-item">
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type={visiblePass ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleOnChangeForm}
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
          <div className="oauth">
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
