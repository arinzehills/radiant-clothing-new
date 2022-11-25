import React from "react";
import { Store } from "react-notifications-component";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const handleNot = ({ title, message, backgroundColor }) => {
  Store.addNotification({
    content: MyNotify({
      title: title,
      message: message,
      backgroundColor: backgroundColor,
    }),
    type: "success",
    container: "top-center",
    insert: "top",
    animationIn: ["animate__animated animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 2000,
      showIcon: true,
    },
    width: 300,
  });
};

function MyNotify({ title, backgroundColor, message }) {
  return (
    <div
      className="gradient"
      style={{
        background: backgroundColor,
        borderRadius: 20,
        // right: 1000,
        width: "100%",
      }}
    >
      <h2>{title ?? "Title"}</h2>
      <h4>{message ?? "Updated"}</h4>
    </div>
  );
}

export default handleNot;
