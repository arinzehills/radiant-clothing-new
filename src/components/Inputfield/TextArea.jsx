import React from "react";

function TextArea({
  label,
  name,
  onHandleChange,
  value,
  style,
  readonly,
  onClick,
  width,
}) {
  return (
    <>
      <textarea
        className="purple-input ipn--medium"
        name={name}
        value={value}
        onChange={onHandleChange}
        onClick={onClick}
        cols="40"
        rows="5"
        style={{ borderRadius: "10px", padding: "10px 0px 0px 10px", width }}
        placeholder={label ?? "Message..."}
        readOnly={readonly}
      ></textarea>
    </>
  );
}

export default TextArea;
