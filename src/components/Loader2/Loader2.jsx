import React from "react";
// import "./Modal.css";
import "./Loader2.css";

const Loader2 = ({
  setOpenModal,
  message,
  backgroundColor,
  zIndex,
  position,
}) => {
  return (
    <div
      // className="modalBackground"
      className="loader2Background"
      style={{ zIndex: zIndex, position: position }}
      onClick={() => {
        //close the modal if the user
        //presses around the body of the page
        //   setOpenModal(false);
      }}
    >
      <div
        className="loader2_container black"
        style={{ background: backgroundColor }}
      >
        {message ?? "Processing..."}
      </div>
    </div>
  );
};

export default Loader2;
