import React from "react";
import { Button } from "../Button/Button";
import InputField from "../Inputfield/InputField";

const Profile = () => {
  return (
    <div
      style={{
        boxShadow: "var(--box-shadow",
        borderRadius: "10px",
        padding: "10px",
      }}
      className={"class_justify_contents_column"}
    >
      <div style={{}} className={"centerClass"}>
        <img src="/svg/avatar.svg" height={"100px"} width={"100px"} />
      </div>
      {/* for the contents */}
      <div
        style={{ gap: "1rem", alignItems: "flex-start" }}
        className="class_justify_contents_column"
      >
        <div
          className="class_justify_contents_row"
          style={{
            gap: "1rem",
            flexDirection: window.innerWidth < 760 && "column",
          }}
        >
          <div>
            <p className="avenir_class">First name</p>
            <InputField label={"Firstname"} />
          </div>
          <div>
            <p className="avenir_class">Last Name</p>
            <InputField label={"Last name"} />
          </div>
        </div>
        <p className="avenir_class">Last Name</p>
        <InputField label={"Email"} style={{ width: "95%" }} />
        <p className="avenir_class">Last Name</p>
        <InputField label={"Phone"} style={{ width: "95%" }} />
        <Button buttonColor={"black"}>Save</Button>
      </div>
      {/* end of contents */}
    </div>
  );
};

export default Profile;
