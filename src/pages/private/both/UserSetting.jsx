import { useEffect, useState } from "react";
// import styles
import "../../../styles/dashboard/setting/setting.css";
// import components
import { Dashnav } from "../../../components/navbar/Dashnav";
export const UserSetting = () => {
  // state
  const [isToggleChangePass, setIsToggleChangePass] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // handle func
  useEffect(() => {
    if (!isToggleChangePass) {
      setNewPass("");
      setConfirmPass("");
    }
  }, [isToggleChangePass]);

  // handle func
  const handleToggleChangePassTrue = () => {
    setIsToggleChangePass(true);
  };

  const handleToggleChangePassFalse = () => {
    setIsToggleChangePass(false);
  };
  return (
    <div className="user-setting-container">
      <Dashnav />
      <div className="user-setting">
        <div className="setting-header">
          <strong>Truong Hoang Tri's setting</strong>
        </div>
        <form action="" autoComplete="off" className="profile-form">
          <div className="header">
            <strong>Profile Setting</strong>
            <p>You can customize your account infomation</p>
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder="Enter your email" />
          </div>
          <div className="item">
            <label htmlFor="fullname">Your name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name"
            />
          </div>
          <div className="item">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="item">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="Enter your address" />
          </div>
          <button>Update Infomation</button>
        </form>
        <form action="" autoComplete="off" className="security-form">
          <div className="header">
            <div>
              <strong>Security Setting</strong>
              <p>You can change your sensitive infomation</p>
            </div>
            {isToggleChangePass ? (
              <span id="disable" onClick={handleToggleChangePassFalse}>
                Disable change password
              </span>
            ) : (
              <span id="enable" onClick={handleToggleChangePassTrue}>
                Enable change password
              </span>
            )}
          </div>

          <div className="item">
            <label htmlFor="recent">Recent password</label>
            <input
              type="password"
              id="recent"
              placeholder="Your recent password"
              disabled
            />
          </div>
          <div className="item">
            <label htmlFor="newpass">New password</label>
            <input
              type="password"
              id="newpass"
              placeholder="Enter new password"
              onChange={(e) => setNewPass(e.target.value)}
              value={newPass}
              disabled={!isToggleChangePass}
            />
          </div>
          <div className="item">
            <label htmlFor="confirm">Confirm password</label>
            <input
              type="password"
              id="confirm"
              placeholder="Enter confirm password"
              onChange={(e) => setConfirmPass(e.target.value)}
              value={confirmPass}
              disabled={!isToggleChangePass}
            />
          </div>
          <button id="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};
