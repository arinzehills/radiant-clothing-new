import { Icon } from "@iconify/react";
import React from "react";
import ProfilePicsComponent from "../../../../components/ProfilePicsComponent/ProfilePicsComponent";
import useUser from "../../../../useUser";

import "./NavComponent.css";

function NavComponent({
  personsName,
  pageTitle,
  handleClick,
  showNotification,
  setHandleNotData,
  isSticky,
}) {
  const { user, setUser } = useUser();
  let isOnline;
  // const data = await fetch(window.baseUrl + "getCurrentUser?token=" + token)
  //     .then((ddd) => ddd.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  return (
    <>
      <div
        className={
          isSticky ? "nav-cmpt-section withstickybar " : "nav-cmpt-section"
        }
      >
        {window.innerWidth < 960 && (
          <>
            <Icon
              icon="bxs:category"
              style={{ color: "grey", fontSize: "20px" }}
              onClick={handleClick}
            />
            <img
              className="sidebar-logo"
              style={{ height: 60 }}
              src="/images/conterize.png"
              alt=""
            />
          </>
        )}
        <div className="nav-title-wrapper">
          {window.innerWidth > 960 && <h2>{pageTitle ?? "Dashboard"}</h2>}
        </div>
        {
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {showNotification && (
              <Icon
                icon="carbon:notification-new"
                color="gray"
                fontSize="22px"
              />
            )}
            <ProfilePicsComponent
              name={personsName ?? user?.["firstname"]}
              // isOnline={"Online" ?? user?.["online_status"]}
              isCirclular={true}
              size="120px"
              setHandleNotData={setHandleNotData}
            />
          </div>
        }
        {/* {window.innerWidth < 960 && (
            <div className="nav-profile-wrapper">
              <img src="/svg/avatar.svg" style={{ height: 20 }} alt="" />
            </div>
          )} */}
      </div>
    </>
  );
}

export default NavComponent;
