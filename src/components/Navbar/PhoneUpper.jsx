import { Icon } from "@iconify/react";
import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { TiTimesOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import useToken from "../../useToken";
import useUser from "../../useUser";
import InputWithIcon from "../InputWithIcon/InputWithIcon";
import ProfilePicsComponent from "../ProfilePicsComponent/ProfilePicsComponent";
import { CartIcon } from "./UpperNavbar";

const PhoneUpper = ({ handleClick, click }) => {
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  return (
    <div
      style={{ background: "black", height: "170px", position: "sticky" }}
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
        <div className="class_justify_contents_column">
          <div
            className="menu-icon"
            onClick={handleClick}
            style={{ marginTop: "1rem" }}
          >
            {click ? (
              <TiTimesOutline fontSize={38} />
            ) : (
              <HiMenuAlt4 fontSize={38} />
            )}
          </div>
          <Link to="/" onClick={() => closeMobileMenu(1)}>
            <img
              src="images/logo.png"
              style={{
                height: 90,
                paddingLeft: window.innerWidth < 960 && "60px",
              }}
              alt="radiant-clothing-logo"
            />
          </Link>
        </div>

        {/* <p style={{ color: "white" }}>Dsds</p> */}
        <div style={{ gap: "1rem" }} className="class_justify_contents_row">
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
        </div>
      </div>
      {/* <div
        style={
          {
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
          }
        }
      > */}
      <InputWithIcon
        inputHeight={"45px"}
        inputData={{
          label: "Search products..",
        }}
        iconName={"ic:outline-search"}
      />
      {/* </div> */}
    </div>
  );
};

export default PhoneUpper;
