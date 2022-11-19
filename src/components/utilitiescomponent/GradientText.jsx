import React from "react";
import "./GradientText.css";

const GradientText = ({ text, style, dontanimate, classColor }) => {
  return (
    <>
      <h1
        className={`${
          dontanimate ? "no-linear-wipe" : " linear-wipe "
        } ${classColor}`}
        style={{ margin: 0, ...style }}
      >
        {text ?? "Shine!"}
      </h1>
    </>
  );
};

export default GradientText;
