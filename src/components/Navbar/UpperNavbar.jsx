import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import SearchContext from "../../context/SearchContext";
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
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [handleNotData, setHandleNotData] = useState({
    message: "no",
    color: "var(--success)",
  });
  console.log(token);
  return (
    <div className="upper_nav_container">
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
            src="/images/radiant_logo.png"
            // src="/images/logo.png"
            // style={{ height: 90 }}
            alt="radiant-clothing-logo"
          />
        </Link>

        <div style={{ width: "500px", paddingLeft: "1rem" }}>
          <InputWithIcon
            // inputSize={"ipn--wide"}
            onHandleChange={(e) => setSearchTerm(e.target.value)}
            inputHeight={"45px"}
            inputData={{
              label: "Search for products, brands and categories...",
            }}
            iconName={"ic:outline-search"}
          />
        </div>

        <div style={{ gap: "1rem" }} className="class_justify_contents_row">
          <CartIcon icon="material-symbols:shopping-cart" color="white" />
          {token === null ? (
            <Link to={"/login"}>
              <Icon icon="mdi:user" color="white" fontSize={"33px"} />
            </Link>
          ) : (
            <ProfilePicsComponent
              name={user?.["full_name"].substring(
                0,
                user?.["full_name"].indexOf(" ")
              )}
              // isOnline={"Online" ?? user?.["online_status"]}
              isCirclular={true}
              size="120px"
              nameColor={"white"}
              // setHandleNotData={setHandleNotData}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export const CartIcon = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <>
      <Link to={"/cart"}>
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
          {cartItems.length > 0 ? (
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
              {cartItems.length}
            </div>
          ) : null}
        </div>
      </Link>
    </>
  );
};
export default UpperNavbar;
