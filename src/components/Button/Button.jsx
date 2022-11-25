import React from "react";
import "./Button.css";

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor,
  style,
  isCircular,
  loading,
}) => {
  const COLOR = ["gold", "black", "orange"];
  const STYLES = ["btn--normal", "btn--outline"]; //for button with border only or not

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : null;

  return (
    <button
      style={{ ...style, opacity: loading && "0.6" }}
      className={
        `btn 
            ${checkButtonColor}
            ${checkButtonStyle}
             ${isCircular && "btn--rounded"}` //for button that is rounded
      }
      onClick={loading ? null : onClick}
      type={type}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
