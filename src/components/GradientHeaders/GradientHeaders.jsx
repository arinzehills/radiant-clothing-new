import React from "react";
import GradientText from "../utilitiescomponent/GradientText";

const GradientHeaders = ({ text, fontSize, showSubHeader, subHeader }) => {
  return (
    <div>
      <GradientText
        text={text ?? "About me"}
        dontanimate={true}
        style={{
          // lineHeight: 1,
          fontSize: fontSize ?? "3vw",
          textAlign: "center",
        }}
      />
      {showSubHeader && (
        <h2
          style={{
            letterSpacing: "1rem",
            textAlign: "center",
            padding: "0.5rem",
            lineHeight: 0,
            textTransform: "uppercase",
          }}
        >
          {subHeader ?? " SOME OF MY WORK"}
        </h2>
      )}

      <div
        className=" underline_div_container"
        style={{ marginTop: !showSubHeader && "1rem" }}
      >
        <div className="under_line_div red"></div>
      </div>
    </div>
  );
};

export default GradientHeaders;
