import React, { useState } from "react";
import { Button } from "../../../components/Button/Button";
import InputField from "../../../components/Inputfield/InputField";

const EditGst = () => {
  const [gst, setGst] = useState("");

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
        // style={{width:}}
        onHandleChange={(e) => setGst(e.target.value)}
      />
      <Button
        buttonColor={"orange"}
        style={{ color: "white" }}
        // onClick={onSubmit}
        // loading={loading}
      >
        Update
      </Button>
    </div>
  );
};

export default EditGst;
