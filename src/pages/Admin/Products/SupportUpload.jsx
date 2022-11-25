import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "../../../components/Button/Button";

const SupportUpload = ({ onClickBtn, fileNamesRef, label }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #ececec",
          lineHeight: 1.1,
          color: "grey",
          // padding: "10px",
          padding: "1rem 0 0 0.5rem",
        }}
      >
        <Button
          buttonStyle={"btn--outline"}
          style={{
            display: "flex",
            alignItems: "center",
            color: "var(--light-orange)",
            border: "1px solid var(--light-orange)",
          }}
          onClick={onClickBtn}
        >
          <Icon icon="akar-icons:circle-plus-fill" fontSize={23} />
          Upload File
        </Button>
        <p ref={fileNamesRef}>{label ?? "click to upload product images"}</p>
      </div>
    </>
  );
};

export default SupportUpload;
