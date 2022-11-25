import React from "react";

const LazyLoader = ({ widthRatio, dontShowSecond, height }) => {
  return (
    <div
      className="product-item class_justify_contents_column"
      style={{
        gap: "0.5rem",
        alignItems: "flex-start",
        height: height,
        width: height,
      }}
    >
      <div
        style={{
          height: "200px",
          width: "99.8%",
          background: "var(--grey2)",
        }}
      ></div>
      <div
        style={{
          height: "20px",
          width: widthRatio ?? "79%",
          borderRadius: "10px",
          marginBottom: "10px",
          background: "var(--grey2)",
        }}
      ></div>
      {!dontShowSecond && (
        <div
          style={{
            height: "20px",
            width: "59%",
            borderRadius: "10px",
            background: "var(--grey2)",
          }}
        ></div>
      )}
    </div>
  );
};

export default LazyLoader;
