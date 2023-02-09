import React from "react";
import InputField from "../../../components/Inputfield/InputField";
import handleChange from "../../../utils/handleChange";

const MeasurementContainer = ({ formValues, setFormValues }) => {
  return (
    <div
      className="class_justify_contents_row withGap"
      style={{ justifyContent: "start" }}
    >
      <InputField
        label={"length"}
        name={"length"}
        inputStyle="input--shadow-purple"
        style={{ width: "10%" }}
        inputColor="purple-input"
        onHandleChange={(e) =>
          !isNaN(e.nativeEvent?.data) &&
          handleChange(e, formValues, setFormValues)
        }
        value={formValues.length}
      />
      <InputField
        label={"breadth"}
        name={"breadth"}
        inputStyle="input--shadow-purple"
        style={{ width: "10%" }}
        inputColor="purple-input"
        onHandleChange={(e) =>
          !isNaN(e.nativeEvent?.data) &&
          handleChange(e, formValues, setFormValues)
        }
        value={formValues.breadth}
      />
      <InputField
        label={"height"}
        name={"height"}
        inputStyle="input--shadow-purple"
        style={{ width: "10%" }}
        inputColor="purple-input"
        onHandleChange={(e) =>
          !isNaN(e.nativeEvent?.data) &&
          handleChange(e, formValues, setFormValues)
        }
        value={formValues.height}
      />
      <InputField
        label={"weight(kg)"}
        name={"weight"}
        inputStyle="input--shadow-purple"
        style={{ width: "10%" }}
        inputColor="purple-input"
        onHandleChange={(e) =>
          !isNaN(e.nativeEvent?.data) &&
          handleChange(e, formValues, setFormValues)
        }
        value={formValues.weight}
      />
    </div>
  );
};

export default MeasurementContainer;
