import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useToken from "../../useToken";
import useUser from "../../useUser";
import IconAndCircle from "../IconAndCircle/IconAndCircle";
import InputField from "../Inputfield/InputField";
import InputWithIcon from "../InputWithIcon/InputWithIcon";
import ProfilePicsComponent from "../ProfilePicsComponent/ProfilePicsComponent";
import "./UpperNav.css";

const UpperNavbar = () => {
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const [handleNotData, setHandleNotData] = useState({
    message: "no",
    color: "var(--success)",
  });
  console.log(token);
  return (
    <>
      <div
        style={{
          background: "black",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "0 25px",
          height: window.innerWidth < 960 && "170px",
        }}
        className="class_justify_contents_row"
      >
        {/* for logo and text */}

        <Link to="/" className="navbar-logo" onClick={() => closeMobileMenu(1)}>
          <img
            src="images/logo.png"
            // style={{ height: 90 }}
            alt="radiant-clothing-logo"
          />
        </Link>

        <div style={{ width: "500px", paddingLeft: "1rem" }}>
          <InputWithIcon
            // inputSize={"ipn--wide"}
            inputHeight={"45px"}
            inputData={{
              label: "Search for products, brands and categories...",
            }}
            iconName={"ic:outline-search"}
          />
        </div>

        <Link
          to={"/cart"}
          style={{ gap: "1rem" }}
          className="class_justify_contents_row"
        >
          <CartIcon icon="material-symbols:shopping-cart" color="white" />
          {token === null ? (
            <Link to={"/login"}>
              <Icon icon="mdi:user" color="white" fontSize={"33px"} />
            </Link>
          ) : (
            <Link to={"#"}>
              <ProfilePicsComponent
                name={user?.["firstname"]}
                // isOnline={"Online" ?? user?.["online_status"]}
                isCirclular={true}
                size="120px"
                // setHandleNotData={setHandleNotData}
              />
            </Link>
          )}
        </Link>
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
export default UpperNavbar;
