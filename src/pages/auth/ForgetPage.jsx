import React from "react";
import { Link } from "react-router-dom";
// import styles
import "../../styles/auth/auth.css";
// import assets
import coverImg from "../../assets/logincover3.jpg";
// import logo from "../../assets/logo.png";

export const ForgetPage = () => {
  return (
    <div className="cover">
      <img src={coverImg} alt="" />
      <div className="forget-container">
        <div className="forget-main">
          <div className="forget-header">
            <div>
              <strong>Forget password?</strong>
              <p>Oops, don't worry we will help you take back your account</p>
            </div>
          </div>
          <form action="" autoComplete="off" className="forget-form">
            <input type="text" placeholder="Enter your email" />
            <input type="submit" value="Send to my email" />
          </form>
          <Link to="/login">Just remember password?</Link>
        </div>
        <div className="forget-right">
          <p>
            "Koi wa gyakkyo ni chokumen shitemo nintai to tsuyosa o shōchō shi,
            chōsen wa nintai to kenshin de norikoeru koto ga dekiru koto o
            watashitachi ni omoidasa semasu." - Izumiya Koi
          </p>
        </div>
      </div>
    </div>
  );
};
