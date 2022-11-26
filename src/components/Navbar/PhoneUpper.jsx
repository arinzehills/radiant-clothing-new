import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import InputWithIcon from "../InputWithIcon/InputWithIcon";

const CartIcon = () => {
  return (
    <>
      <div
        style={{
          // background: "white",
          height: window.innerWidth < 770 ? "35px" : "45px",
          width: window.innerWidth < 770 ? "35px" : "45px",
          borderRadius: "50px",
        }}
        className="centerClass gold_color_light"
      >
        <Icon
          icon="material-symbols:shopping-cart"
          fontSize={window.innerWidth < 770 ? "15px" : "20px"}
          color="black"
        />
        <div
          style={{
            // height: "18px",
            // width: "18px",
            padding: "3px",
            background: "var(--pink)",
            borderRadius: "50px",
            fontSize: "10px",
            color: "white",
            position: "absolute",
            marginBottom: "20px",
            marginLeft: "20px",
          }}
        >
          10
        </div>
      </div>
    </>
  );
};
const PhoneUpper = ({}) => {
  return (
    <div
      style={{ background: "black", height: "170px" }}
      className="class_justify_contents_column"
    >
      <div
        className="class_justify_contents_row"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
        }}
      >
        {" "}
        <Link to="/" onClick={() => closeMobileMenu(1)}>
          <img
            src="images/logo.png"
            style={{ height: 90 }}
            alt="radiant-clothing-logo"
          />
        </Link>
        {/* <p style={{ color: "white" }}>Dsds</p> */}
        <div style={{ gap: "1rem" }} className="class_justify_contents_row">
          <CartIcon icon="material-symbols:shopping-cart" color="white" />
          <Icon icon="mdi:user" color="white" fontSize={"33px"} />
        </div>
      </div>

      <InputWithIcon
        inputHeight={"45px"}
        inputData={{
          label: "Search products..",
        }}
        iconName={"ic:outline-search"}
      />
    </div>
  );
};

export default PhoneUpper;
