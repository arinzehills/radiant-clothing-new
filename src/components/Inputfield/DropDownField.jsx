import React, { useState } from "react";
import "./Inputfield.css";
import "./Dropdownfield.css";
import { FaMobile } from "react-icons/fa";
import { AiOutlineDown } from "react-icons/ai";

function DropDownField({
  inputStyle,
  inputColor,
  inputSize,
  style,
  selected,
  setSelected,
  options,
  children,
  height,
  // isActive,
  // setIsActive
}) {
  const STYLES = [
    "input--primary",
    "input--shadow-purple",
    "input--shadow-orange",
  ];
  const SIZES = [
    "ipn--small",
    "ipn--medium",
    "ipn--large",
    "ipn--wide",
    "width-353",
  ];
  const COLOR = ["purple-input", "orange-input"];

  const checkInputStyle = STYLES.includes(inputStyle) ? inputStyle : null;
  const checkInputColor = COLOR.includes(inputColor) ? inputColor : null;
  const checkInputSize = SIZES.includes(inputSize) ? inputSize : null;
  // console.log(values.map((value)=>value.value))
  //    const valuesMap=values.map((values)=>values.value)
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="dropdown ">
        <div
          className={`dropdown-btn
          dashboard-input
                        ${checkInputStyle}
                        ${checkInputColor}
                        ${checkInputSize}
            `}
          style={{
            width: window.innerWidth > 960 ? 280 : "900",
            height: height ?? 37,
          }}
          onClick={(e) => setIsActive(!isActive)}
        >
          {selected}
          <span>
            <AiOutlineDown color="grey" />
          </span>
        </div>
        {isActive && (
          <div className="dropdown-content">
            {options.map((option) => (
              <div
                key={option}
                onClick={(e) => {
                  setSelected(option);
                  setIsActive(false);
                }}
                className="dropdown-item"
              >
                {children} {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
  //  document.getElementsByTagName(input)[0]
}

export default DropDownField;
