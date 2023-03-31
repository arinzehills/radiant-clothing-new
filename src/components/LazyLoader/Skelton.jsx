import React from "react";

const Skelton = ({ height, width }) => {
  return (
    <div>
      <div
        style={{
          background: "var(--grey2)",
          height: height ?? 40,
          width: width ?? 80,
          borderRadius: 10,
        }}
      ></div>
    </div>
  );
};

export default Skelton;
