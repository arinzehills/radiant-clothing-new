import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../useToken";
import useUser from "../../useUser";
import logout from "./logout";
import "./ProfilePicsComponent.css";
const ProfilePicsComponent = ({
  name,
  isOnline,
  isCirclular,
  userType,
  nameColor,
  isImage,
  setHandleNotData,
  showCaret,
  circularWidth,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  console.log(openDropDown);
  const { token, setToken } = useToken();
  const { user, setUser } = useUser();
  const ProfileDropDown = ({ openDropDown, setOpenDropDown }) => {
    const stopPropagation = (event) => {
      event.stopPropagation();
    };
    const IconAndName = ({ iconName, title, routeLink }) => {
      return (
        <Link
          to={`/dashboard/${routeLink}`}
          style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
          onClick={() => setOpenDropDown(false)}
        >
          {/* <Link to="/dashboard/team"> */}
          <div className="dashboard-card-row prfrow">
            <Icon
              icon={iconName ?? "healthicons:i-schedule-school-date-time"}
              fontSize={"20px"}
              color="gray"
            />
            <p>{title}</p>
          </div>
        </Link>
      );
    };
    const IconAndLogout = ({ iconName, title, onClick }) => {
      return (
        <div className="dashboard-card-row prfrow" onClick={onClick} style={{}}>
          <Icon
            icon={iconName ?? "uiw:logout"}
            fontSize={"20px"}
            color="gray"
          />
          <p>{title ?? "Logout"}</p>
        </div>
      );
    };
    const history = useNavigate();

    return (
      <AnimatePresence>
        {openDropDown && (
          <>
            <motion.div
              className="profile_pics_dropDown_backdrop"
              onClick={() => setOpenDropDown(false)}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.7,
                },
              }}
              exit={{
                opacity: 0,
              }}
            >
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                  transition: {
                    duration: 0.3,
                  },
                }}
                exit={{ scale: 0 }}
                className="profile_pics_drop_content"
                onClick={stopPropagation}
              >
                <motion.div
                  initial={{
                    x: 100,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.7,
                    },
                  }}
                  exit={{ opacity: 0, x: 100 }}
                  className="profile_pics_dropDown_content"
                >
                  <IconAndName
                    title={"Orders"}
                    routeLink={"orders"}
                    iconName={"bx:cart"}
                  />
                  <IconAndName
                    routeLink={"wishlist"}
                    title={"Wish List"}
                    iconName={"mdi:love"}
                  />
                  <IconAndName
                    title={"Profile"}
                    routeLink={"settings"}
                    iconName={"iconoir:profile-circled"}
                  />
                  <IconAndLogout
                    onClick={() =>
                      logout({
                        token: token,
                        setToken: setToken,
                        setHandleNotData: setHandleNotData,
                        history: history,
                      })
                    }
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <ProfileDropDown
        openDropDown={openDropDown}
        setOpenDropDown={setOpenDropDown}
      />

      <div
        className={isCirclular ? "prf-container iscircular " : "prf-container "}
        onClick={() => setOpenDropDown(!openDropDown)}
        style={{ width: circularWidth }}
      >
        <div
          className={isCirclular ? "pic-wrapper iscircular" : "pic-wrapper "}
        >
          {isImage ? (
            <img src="/svg/avatar.svg" alt="" />
          ) : !name ? (
            "U"
          ) : (
            name.charAt(0)
          )}
        </div>

        {/* {window.innerWidth > 660 && ( */}
        <div
          className={isCirclular ? "pic-text iscircular" : "pic-text"}
          style={{
            justifyContent: isCirclular && "center",
          }}
        >
          <p
            style={{
              fontWeight: isCirclular ? "normal" : "bold",
              textAlign: "left",
              // gap: 0,
              marginLeft: "-6px",
              textTransform: "capitalize",
              color: nameColor,
            }}
          >
            {isOnline === "Online" && (
              <Icon
                icon="ci:dot-03-m"
                color={"var(--success)"}
                // style={{ paddingTop: "6px" }}
              />
            )}
            {!name ? "User" : name}
          </p>

          {!isCirclular && (
            <span>
              {
                userType ?? "User" //this shows the type of user/normal/admin etc
              }
            </span>
          )}
        </div>
        {/* )} */}
        {isCirclular && //if this is a circlular profile pics component show this icon
          (showCaret === false ? (
            ""
          ) : (
            <div className="prf-pic-icon">
              <Icon
                icon="ant-design:caret-up-filled"
                color="gray"
                vFlip={true}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default ProfilePicsComponent;
