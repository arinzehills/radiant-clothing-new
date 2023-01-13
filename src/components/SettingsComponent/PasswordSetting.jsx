import React, { useEffect, useState } from "react";
import useToken from "../../useToken";
import handleChange from "../../utils/handleChange";
import { Button } from "../Button/Button";
import handleNot from "../HandleNotification/HandleNot";
import InputField from "../Inputfield/InputField";
import "./Settings.css";
const PasswordSetting = () => {
  const initialValues = {
    old_password: "",
    password: "",
    confirm_password: "",
  };
  const { token, setToken } = useToken();
  const [formValues, setFormValues] = useState(initialValues);
  const [responseError, setResponseError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
  };
  useEffect(() => {
    // setLoading(true)
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // setLoading(true)
      console.log(formValues);
      resetPassword();
    }
  }, [formErrors]);
  const resetPassword = async () => {
    setLoading(true);
    const data = {
      old_password: formValues.old_password,
      new_password: formValues.password,
      token: token,
    };
    // const url="http://localhost/buyenergy_api/public/api/resetPassword";
    // const url="https://buyenergy.herokuapp.com/public/api/";
    const url = window.baseUrl + "changePassword";

    fetch(url, {
      // credentials: 'include
      // Authorization:'http://localhost:8000/api/user',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // 'Authorization': 'http://localhost:8000/api/user',
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data["success"] === true) {
          setLoading(false);
          handleNot({
            title: "Success",
            message: data["message"] ?? "Your request have been Placed!",
            backgroundColor: "var(--success)",
          });
          setToken(data.user.token);
        } else {
          const error = data["message"];
          console.log(error);
          setResponseError(error);
          setLoading(false);
        }
        // console.log('Success:', data);
      })
      .catch((error) => {
        console.warn("Error:", error);
      });
  };
  // console.log(loading)
  const validate = (values) => {
    const errors = {};
    if (!values.old_password) {
      errors.old_password = "Old password is required";
    } else if (!values.password) {
      errors.password = "New password is required";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Password did not match Old";
    }

    return errors;
  };
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
          <p className="errors">{responseError ?? ""}</p>
          <p className="errors">{formErrors.old_password ?? ""}</p>
          <p className="errors">{formErrors.password ?? ""}</p>
          <p className="errors">{formErrors.confirm_password ?? ""}</p>

          {/* change password for large screens */}
          {window.innerWidth > 763 && (
            <Button
              children={"Save"}
              onClick={onSubmit}
              buttonColor="black"
              loading={loading}
            />
          )}
        </div>

        <div className="settings-row">
          <div className="settings-col">
            {/* goes bottom-to-top */}
            <h3>Old Password</h3>
            <InputField
              name={"old_password"}
              style={{ width: "250px" }}
              value={formValues.old_password}
              onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
            />
          </div>
          <div className="settings-col">
            <h3>New Password</h3>

            <InputField
              name={"password"}
              style={{ width: "250px" }}
              value={formValues.password}
              onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
            />
          </div>
          <div className="settings-col">
            <h3>Retype Password</h3>

            <InputField
              name={"confirm_password"}
              style={{ width: "250px" }}
              value={formValues.confirm_password}
              onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
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
            loading={loading}
            onClick={onSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordSetting;
