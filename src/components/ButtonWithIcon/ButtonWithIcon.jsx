import React from "react";
import { Button } from "../Button/Button";
const ButtonWithIcon = ({ title, buttonColor, imageName, imageheight }) => {
  return (
    <>
      <Button buttonColor={buttonColor ?? "red"} buttonStyle={"btn--rounded"}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            background: "inherit",
            color: "inherit",
            justifyContent: "center",
          }}
        >
          {title ?? "See more"}
          <img
            // className="sidebar-logo"

            style={{
              height: imageheight ?? 15,
              color: "inherit",
            }}
            src={imageName ?? "/svg/arrowright.svg"}
            alt="imgicon"
          />
        </div>
      </Button>
    </>
  );
};

export default ButtonWithIcon;
