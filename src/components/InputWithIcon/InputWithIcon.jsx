import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "../Button/Button";
import InputField from "../Inputfield/InputField";

const InputWithIcon = ({
  inputData,
  name,
  onHandleChange,
  iconName,
  onClickIcon,
  inputkey,
  inputType,
  ref,
  value,
  inputHeight,
  showbtn,
}) => {
  return (
    <>
      <div
        key={inputkey}
        style={{
          display: "flex",
          width:
            window.innerWidth < 660
              ? "95%"
              : window.innerWidth < 960
              ? "85%"
              : "107%",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <InputField
          type={inputType}
          {...inputData}
          name={name}
          style={{
            width: "100%",
            height: inputHeight ?? 50,
            overFlow: "ellipses",
          }}
          onHandleChange={onHandleChange}
          ref={ref}
          value={value}
        />

        <div
          style={{
            position: "relative",
            right: window.innerWidth < 680 ? 40 : 50,
            color: "#93939B",
            // fontSize: 24,
          }}
        >
          {showbtn ? (
            <Button>Upload File</Button>
          ) : (
            <div style={{ background: "", cursor: "pointer" }}>
              <Icon
                icon={iconName ?? "fa-solid:file-upload"}
                fontSize={"38px"}
                onClick={onClickIcon}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InputWithIcon;
