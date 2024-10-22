import React from 'react';
import '../../styles/components/Alert/alert.css';

export const Alert = ({ type, text }) => {
  const alertClass = type === 'danger' ? 'alert--danger' : 'alert--success';
  const badgeClass = type === 'danger' ? 'alert__badge--danger' : 'alert__badge--success';
  const badgeText = type === 'danger' ? 'Failed' : 'Success';

  return (
    <div className="alert-container">
      <div className={`alert ${alertClass}`} role="alert">
        <p className={`alert__badge ${badgeClass}`}>
          {badgeText}
        </p>
        <p className="alert__text">{text}</p>
      </div>
    </div>
  );
};

