import React from "react";

const NoDataFound = ({ message }) => {
  return (
    <div>
      <div className="class_justify_contents_column ">
        <img src="/svg/notfound.svg" alt="" height={"300px"} />
        <span className="italics" style={{ fontSize: "20px" }}>
          {message ?? "No Data Found"}
        </span>
      </div>
    </div>
  );
};

export default NoDataFound;
