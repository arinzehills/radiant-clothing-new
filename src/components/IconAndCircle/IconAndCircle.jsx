import { Icon } from "@iconify/react";
import React from "react";

const IconAndCircle = ({ iconName, colorClass }) => {
  return (
    <>
      <div
        style={{
          // background: "white",
          height: "50px",
          width: "50px",
          borderRadius: "50px",
        }}
        className={`centerClass ${colorClass ?? "gold_color_light"}`}
      >
        <Icon icon={iconName ?? "ic:outline-search"} color="white" />
      </div>
    </>
  );
};

export default IconAndCircle;
