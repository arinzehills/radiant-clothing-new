import React, { useEffect } from "react";

import "./ProgressBar.css";
const ProgressBar = ({ percent, width, colorClass, height }) => {
  const [value, setValue] = React.useState(0);

  console.log(value);
  useEffect(() => {
    setValue(percent * width);
  }, [percent, width, colorClass]);
  return (
    <>
      {" "}
      <div className={`progress-div `} style={{ width: width, height: height }}>
        <div
          style={{ width: `${value}px`, height: height }}
          className={`progress ${colorClass}`}
        />
      </div>
    </>
  );
};

export default ProgressBar;
