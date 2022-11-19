import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import IconAndCircle from "../IconAndCircle/IconAndCircle";
import InputField from "../Inputfield/InputField";
import InputWithIcon from "../InputWithIcon/InputWithIcon";

const UpperNavbar = () => {
  return (
    <>
      <div
        style={{
          background: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 25px",
        }}
      >
        <Link to="/" className="navbar-logo" onClick={() => closeMobileMenu(1)}>
          <img
            src="images/logo.png"
            style={{ height: 90 }}
            alt="radiant-clothing-logo"
          />
        </Link>
        <div style={{ width: "700px" }}>
          <InputWithIcon
            //   inputSize={"ipn--wide"}
            inputHeight={"45px"}
            inputData={{
              label: "Search for products, brands and categories...",
            }}
            iconName={"ic:outline-search"}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <CartIcon icon="material-symbols:shopping-cart" color="white" />
          <Icon icon="mdi:user" color="white" fontSize={"33px"} />
        </div>
      </div>
    </>
  );
};
const CartIcon = () => {
  return (
    <>
      <div
        style={{
          // background: "white",
          height: "45px",
          width: "45px",
          borderRadius: "50px",
        }}
        className="centerClass gold_color_light"
      >
        <Icon
          icon="material-symbols:shopping-cart"
          fontSize="20px"
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
export default UpperNavbar;
