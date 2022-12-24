import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import handleNot from "../../../components/HandleNotification/HandleNot";
import InputField from "../../../components/Inputfield/InputField";
import Loader from "../../../components/Loader/Loader";
import SupportUpload from "./SupportUpload";

const AddCategories = ({ setHandleNotData, setOpenModal }) => {
  const fileNamesRef = React.useRef();
  const pickFileRef = React.useRef();
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleClickMaterials = () => {
    pickFileRef.current.click();
  };
  const handlePickFiles = (e) => {
    e.preventDefault();

    setFiles(e.target.files);
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate({ category: category, file: files[0] }));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // setLoading(true)
      addCategory();
    }
  }, [formErrors]);
  const addCategory = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("category", category);
    console.log(files[0]);
    data.append("image", files[0]);
    console.log(Object.fromEntries(data));

    const url = window.baseUrl + "admin/addCategory";

    fetch(url, {
      method: "POST",
      body: data,
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
  const validate = (values) => {
    const errors = {};
    if (!values.category) {
      errors.category = "Category is required";
    }
    if (!values.file) {
      errors.file = "Select an image";
    }
    return errors;
  };

  return (
    <div>
      <h1 style={{ lineHeight: 2 }}>Add Category</h1>
      <h5 style={{ lineHeight: 0 }}>Category Name</h5>
      <InputField
        label={"Enter category"}
        value={category}
        name={"category"}
        inputSize={"ipn--wide"}
        // style={{width:}}
        onHandleChange={(e) => setCategory(e.target.value)}
      />
      <p className="errors">{formErrors.category}</p>
      <div style={{ height: "10px" }}></div>
      <img src={image} height="80px" />
      <SupportUpload
        onClickBtn={handleClickMaterials}
        fileNamesRef={fileNamesRef}
        label="  Upload an image for this category..."
      />
      <input
        type="file"
        // name=""
        name="supporting_materials"
        ref={pickFileRef}
        onChangeCapture={handlePickFiles}
        accept="image/*"
        hidden
      />
      <p className="errors">{formErrors.file}</p>

      <Button
        buttonColor={"orange"}
        style={{ color: "white" }}
        onClick={onSubmit}
        loading={loading}
      >
        Add
      </Button>
    </div>
  );
};

export default AddCategories;
