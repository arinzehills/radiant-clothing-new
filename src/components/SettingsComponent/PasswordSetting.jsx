import React from "react";
import { Button } from "../Button/Button";
import InputField from "../Inputfield/InputField";
import "./Settings.css";
const PasswordSetting = () => {
  return (
    <div
      style={{
        width: window.innerWidth < 660 ? "115%" : "100%",
      }}
    >
      <div
        className="settings-container"
        style={{
          width: window.innerWidth > 960 ? "110%" : "210%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3
            style={{
              textAlign: "left",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            {"Change password"}
          </h3>
          {/* change password for large screens */}
          {window.innerWidth > 763 && (
            <Button
              children={"Save"}
              // onClick={savePassword}
              buttonColor="black"
            />
          )}
        </div>

        <div className="settings-row">
          <div className="settings-col">
            {/* goes bottom-to-top */}
            <h3>Old Password</h3>
            <InputField
              name={"oldpassword"}
              style={{ width: "250px" }}
              // value={formValues.oldpassword}
              // onHandleChange={handleChange}
            />
          </div>
          <div className="settings-col">
            <h3>New Password</h3>

            <InputField
              name={"password"}
              style={{ width: "250px" }}
              // value={formValues.password}
              // onHandleChange={handleChange}
            />
          </div>
          <div className="settings-col">
            <h3>Retype Password</h3>

            <InputField
              name={"password_confirmation"}
              style={{ width: "250px" }}
              // value={formValues.password_confirmation}
              // onHandleChange={handleChange}
            />
            {/* <p className="errors">{error}</p> */}
          </div>
        </div>
        {/* for smaller screens */}
        {window.innerWidth < 763 && (
          <Button
            title="Personadsdsal Info"
            children={"Save"}
            buttonColor="black"
            // onClick={savePassword}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordSetting;
