import React, { useState, useEffect } from "react";
import { Button } from "../../../components/Button/Button";
import handleNot from "../../../components/HandleNotification/HandleNot";
import ImageSlider from "../../../components/HeroSlider/ImageSlider";
import DropDownField from "../../../components/Inputfield/DropDownField";
import InputField from "../../../components/Inputfield/InputField";
import TextArea from "../../../components/Inputfield/TextArea";
import useFetch from "../../../useFetch";
import handleChange from "../../../utils/handleChange";
import SupportUpload from "./SupportUpload";

const AddProducts = ({ setOpenModal }) => {
  const initialValues = {
    product_name: "",
    description: "",
    price: "",
    images: [],
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [responseError, setResponseError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [files, setFiles] = useState([]);
  const [filespathList, setFilespathList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileNamesRef = React.useRef();
  const pickFileRef = React.useRef();
  const [category, setCategory] = useState("Select category");
  // const [categories, setCategories] = useState(["loading"]);
  const categories = [];
  const {
    data: categoriesData,
    loadingCategories,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getCategories",
    // secondParam: activeRow,
  });
  const handleClickMaterials = () => {
    pickFileRef.current.click();
  };
  const handlePickFiles = (e) => {
    setFilespathList([]);
    e.preventDefault();

    setFiles(e.target.files);
    setFormValues({
      ...formValues,
      images: e.target.files,
    });
  };

  categoriesData?.categories.forEach((cat, index) => {
    categories.push(cat.category);
  });
  console.log(categories);
  const handleAddFilePath = (files) => {
    const newArr = [];
    for (let i = 0; i < files.length; i++) {
      newArr.push(URL.createObjectURL(files[i]));
    }
    setFilespathList([...filespathList, ...newArr]);
  };
  console.log(files);
  console.log(filespathList);
  useEffect(() => {
    handleAddFilePath(files);

    //   // fileNamesRef = "dsjkds";
  }, [files]);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues + "This has validated");
      addProducts();
    }
  }, [formErrors]);

  const addProducts = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("product_name", formValues.product_name);
    data.append("category", category);
    data.append("price", formValues.price);
    data.append("description", formValues.description);
    // data.append("image", files);
    for (let i = 0; i < files.length; i++) {
      // console.log(formValues.supporting_materials[i].name);
      data.append("image", files[i]);
    }
    console.log(Object.fromEntries(data));

    const url = window.baseUrl + "admin/addProduct";
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.product_name) {
      errors.product_name = "Product name is required";
    }
    if (category === "Select category") {
      errors.category = "Please select category";
    }
    if (!values.price) {
      errors.price = "Price is required";
    }
    if (!values.description) {
      errors.description = "Please enter description";
    }
    return errors;
  };
  return (
    <>
      <div>
        <h1 style={{ lineHeight: 2, textAlign: "center" }}>Add Product</h1>
        <h5 style={{ lineHeight: 0 }}>Product Name</h5>
        <InputField
          label={"Enter name"}
          value={formValues.product_name}
          name={"product_name"}
          inputStyle="input--shadow-purple"
          inputColor="purple-input"
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
        />

        <p className="errors">{formErrors.product_name}</p>
        <h5 style={{ lineHeight: 0 }}>Price</h5>
        <InputField
          label={"Enter price"}
          name={"price"}
          inputStyle="input--shadow-purple"
          inputColor="purple-input"
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
          value={formValues.price}
        />
        <p className="errors">{formErrors.price}</p>
        <div className={{}}>
          <h2>Categories</h2>
          <DropDownField
            options={categories}
            selected={category}
            setSelected={setCategory}
          />
        </div>
        <p className="errors">{formErrors.category}</p>

        <h5 style={{ lineHeight: 0 }} className="avenir_class">
          Description
        </h5>
        <TextArea
          label={"Enter product description"}
          name={"description"}
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
          value={formValues.description}
        />
        <p className="errors">{formErrors.description}</p>

        <p className="errors">{responseError ?? ""}</p>
        {/* <p>{filespathList.join(",")}</p> */}
        <div style={{ width: "100%", gap: "5px", overflowX: "hidden" }}>
          {filespathList.map((image) => (
            <img src={image} height="50px" />
          ))}
        </div>

        <SupportUpload
          onClickBtn={handleClickMaterials}
          fileNamesRef={fileNamesRef}
        />
        <input
          type="file"
          // name=""
          name="supporting_materials"
          ref={pickFileRef}
          onChangeCapture={handlePickFiles}
          hidden
          accept="image/*"
          multiple
        />

        <Button
          buttonColor={"orange"}
          style={{ color: "white" }}
          onClick={onSubmit}
          loading={loading}
        >
          Add
        </Button>
      </div>
    </>
  );
};

export default AddProducts;
