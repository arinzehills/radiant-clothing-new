import React, { useState } from "react";
import { Button } from "../../../components/Button/Button";
import handleNot from "../../../components/HandleNotification/HandleNot";
import InputField from "../../../components/Inputfield/InputField";

const EditGst = ({ setOpenModal, gstValue }) => {
  const [gst, setGst] = useState(gstValue);
  const [loading, setLoading] = useState(false);

  console.log(!gst);
  const editGst = async () => {
    setLoading(true);
    const data = {
      gst: gst,
      old_gst: gstValue,
    };
    console.log(data);

    const url = window.baseUrl + "admin/editGst";

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
          setLoading(false);
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
      <h1 style={{ lineHeight: 2 }}>Edit Gst</h1>
      <div className={{}}>
        <h5 style={{ lineHeight: 0 }}>Enter the Currenct GST here</h5>
      </div>
      <InputField
        label={"Enter category"}
        value={gst}
        name={"category"}
        inputSize={"ipn--wide"}
        type={"number"}
        // style={{width:}}
        onHandleChange={(e) =>
          !isNaN(e.nativeEvent?.data) && setGst(e.target.value)
        }
      />
      <Button
        buttonColor={"orange"}
        style={{ color: "white" }}
        onClick={editGst}
        loadingText={!loading ? "Update" : "Loading..."}
        loading={!loading ? gst === gstValue && true : loading}
      >
        Update
      </Button>
    </div>
  );
};

export default EditGst;
