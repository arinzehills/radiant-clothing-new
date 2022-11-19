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
}) => {
  const COLOR = ["gold", "black"];
  const STYLES = ["btn--normal", "btn--outline"]; //for button with border only or not

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : COLOR[0];

  return (
    <button
      style={style}
      className={
        `btn 
            ${checkButtonColor}
            ${checkButtonStyle}
             ${isCircular && "btn--rounded"}` //for button that is rounded
      }
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
