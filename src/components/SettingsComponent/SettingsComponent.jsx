import React from "react";
import NavComponent from "../../pages/Dashboard/components/NavComponent/NavComponent";
import useUser from "../../useUser";
import CustomTab from "../CustomTab/CustomTab";
import PasswordSetting from "./PasswordSetting";
import Profile from "./Profile";

const SettingsComponent = () => {
  const { user, setUser } = useUser();
  return (
    <div>
      {" "}
      <NavComponent
        personsName={"Admin"}
        showNotification={user.user_type === "admin" && true}
        //   handleClick={handleClick}
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
