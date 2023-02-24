import { indexOf } from "lodash";
import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import NavComponent from "../../pages/Dashboard/components/NavComponent/NavComponent";
import useUser from "../../useUser";
import CustomTab from "../CustomTab/CustomTab";
import PasswordSetting from "./PasswordSetting";
import Profile from "./Profile";

const SettingsComponent = () => {
  const { user, setUser } = useUser();
  const [click, setClick] = useOutletContext();
  const handleClick = () => setClick(!click);
  const location = useLocation();

  const route = location.pathname;
  console.log(route.charAt(1));
  return (
    <div>
      <NavComponent
        personsName={"Admin"}
        // showNotification={
        //   user.user_type === "admin" && route.charAt(1) !== "d" ? true : false
        // }
        handleClick={handleClick}
        pageTitle="Settings"
        //   setHandleNotData={setHandleNotData}
      />
      <CustomTab
        tabs={["Profile", "Password & Security"]}
        tabsComponents={[<Profile />, <PasswordSetting />]}
      />
    </div>
  );
};

export default SettingsComponent;
