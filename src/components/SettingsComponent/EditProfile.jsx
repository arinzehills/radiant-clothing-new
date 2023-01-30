import React, { useState } from "react";
import useToken from "../../useToken";
import useUser from "../../useUser";
import { Button } from "../Button/Button";
import handleNot from "../HandleNotification/HandleNot";
import InputField from "../Inputfield/InputField";

const EditProfile = ({ setOpenModal, editValue }) => {
  let key = Object.keys(editValue)[0]; //this is the name to edit, for example email
  let value = Object.values(editValue)[0];
  const { token, setToken } = useToken();
  const { user, setUser } = useUser();
  const [valueToUpdate, setValueToUpdate] = useState(
    Object.values(editValue)[0]
  );
  const [loading, setLoading] = useState(false);
  function refreshPage() {
    window.location.reload();
  }
  console.log(key);
  console.log(Object.values(editValue)[0]);
  console.log(!valueToUpdate);
  const editProfile = async () => {
    setLoading(true);
    editValue[key] = valueToUpdate;
    console.log(editValue);
    const data = editValue;
    console.log(data);

    const url = window.baseUrl + "updateUser?token=" + token;

    fetch(url, {
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
        // console.log( data['token']);

        if (data["success"] === true) {
          console.log("success");
          handleNot({
            title: "Success",
            message: data["message"] ?? "Your request have been Placed!",
            backgroundColor: "var(--success)",
          });
          setOpenModal(false);
          setUser(data.user);
          setLoading(false);
          refreshPage();
        } else {
          const error = data["message"];
          handleNot({
            title: "Error",
            message:
              error ?? "Their is an error in your request data, try again!",
            backgroundColor: "var(--danger)",
          });
          // console.log(error);
          // setResponseError(error);
          setLoading(false);
        }
        // console.log('Success:', data);
      })
      .catch((error) => {
        setLoading(false);

        console.warn("Error:", error);
      });
  };
  return (
    <div>
      <h1 style={{ lineHeight: 2 }}>Edit {key}</h1>
      <div className={{}}>
        <h5 style={{ lineHeight: 0 }}>Enter here</h5>
      </div>
      <InputField
        label={value ? value : `Enter ${key}`}
        value={valueToUpdate}
        name={"category"}
        inputSize={"ipn--wide"}
        // style={{width:}}
        onHandleChange={(e) => setValueToUpdate(e.target.value)}
      />
      <Button
        buttonColor={"orange"}
        style={{ color: "white" }}
        onClick={editProfile}
        loadingText={!loading ? "Update" : "Loading..."}
        loading={!loading ? valueToUpdate === value && true : loading}
      >
        Update
      </Button>
    </div>
  );
};

export default EditProfile;
