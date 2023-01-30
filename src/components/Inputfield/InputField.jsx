import React from "react";
import "./Inputfield.css";

function InputField({
  type,
  label,
  inputStyle,
  inputColor,
  inputSize,
  style,
  readonly,
  value,
  onHandleChange,
  name,
  onClick,
}) {
  const STYLES = [
    "input--primary",
    "input--shadow-purple",
    "input--shadow-orange",
    "input--outline",
  ];
  const SIZES = ["ipn--small", "ipn--medium", "ipn--large", "ipn--wide"];
  const COLOR = ["purple-input", "orange-input"];

  const checkInputStyle = STYLES.includes(inputStyle) ? inputStyle : null;
  const checkInputColor = COLOR.includes(inputColor) ? inputColor : null;
  const checkInputSize = SIZES.includes(inputSize) ? inputSize : null;
  // console.log(values.map((value)=>value.value))
  //    const valuesMap=values.map((values)=>values.value)
  return (
    <>
      <input
        name={name}
        type={type ?? "text"}
        step={type && 0.01}
        style={style}
        className={`input
                ${checkInputStyle}
                ${checkInputColor}
                ${checkInputSize}
            `}
        placeholder={label}
        readOnly={readonly}
        value={value}
        onChange={onHandleChange}
        onClick={onClick}
        cols="40"
        rows="5"
      />
    </>
  );
  //  document.getElementsByTagName(input)[0]
}

export default InputField;
