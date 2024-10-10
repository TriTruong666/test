import React, { useEffect, useState } from "react";
// import styles
import "../../styles/about/about.css";
// import components
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import service
import AboutOurTeam from "../../components/About/Aboutourteam";

export const About = () => {
  // state
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    handleSetIsAuth();
  }, [handleSetIsAuth]);
  return (
    <div className="about-container">
      <Navbar />
      {isAuth && <Settingnav />}
      <div className="about">
        <div className="about-header">
          <strong>About Us</strong>
          <p>Who Are We ?</p>
        </div>
        <AboutOurTeam />
      </div>
      <Footer />
    </div>
  );
};
