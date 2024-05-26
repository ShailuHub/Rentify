import React from "react";
import "./notification.css";

const Notification = ({ message, error }) => {
  return (
    <div id="notification">
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notification;
