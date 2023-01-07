import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../../../components/Button/Button";
import handleNot from "../../../components/HandleNotification/HandleNot";
import ImageSlider from "../../../components/HeroSlider/ImageSlider";
import DropDownField from "../../../components/Inputfield/DropDownField";
import InputField from "../../../components/Inputfield/InputField";
import TextArea from "../../../components/Inputfield/TextArea";
import InputWithIcon from "../../../components/InputWithIcon/InputWithIcon";
import useFetch from "../../../useFetch";
import handleChange from "../../../utils/handleChange";
import SupportUpload from "./SupportUpload";

const AddProducts = ({ setOpenModal, isEdit, product }) => {
  const initialValues = {
    product_id: product?._id ?? "",
    product_name: product?.product_name ?? "",
    description: product?.description ?? "",
    quantity: product?.quantity ?? "",
    price: product?.price ?? "",
    discount_price: product?.discount_price ?? "",
    images: product?.images ?? [],
  };
  const [formValues, setFormValues] = useState(initialValues);

  const superCategories = ["Clothing", "Accessories", "Footwears"];

  const [superCategory, setSuperCategory] = useState("Select category");
  const [responseError, setResponseError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [files, setFiles] = useState([]);
  const [filespathList, setFilespathList] = useState(product?.images ?? []);
  const [loading, setLoading] = useState(false);
  const fileNamesRef = React.useRef();
  const pickFileRef = React.useRef();
  const [category, setCategory] = useState("Select category");
  let [referenceLinks, setReferenceLinks] = useState([
    // "",
    // "",
    { links: "" },
    { links: "" },
  ]);

  const [percentageDiscount, setPercentageDiscount] = useState(0);
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

  const handleAddFilePath = (files) => {
    const newArr = [];
    for (let i = 0; i < files.length; i++) {
      newArr.push(URL.createObjectURL(files[i]));
    }
    setFilespathList([...filespathList, ...newArr]);
  };
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
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      addProducts();
    }
  }, [formErrors]);

  const addProducts = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("product_id", formValues.product_id);
    data.append("product_name", formValues.product_name);
    data.append("super_category", superCategory);
    data.append("category", category);
    data.append("price", formValues.price);
    data.append("discount_price", formValues.discount_price);
    data.append("quantity", formValues.quantity);
    data.append("description", formValues.description);
    // data.append("image", files);
    for (let i = 0; i < files.length; i++) {
      // console.log(formValues.supporting_materials[i].name);
      data.append("image", files[i]);
    }
    for (let i = 0; i < referenceLinks.length; i++) {
      // console.log(formValues.supporting_materials[i].name);
      console.log("referenceLinks[i]");
      console.log(referenceLinks[i]["links"]);
      data.append("sizes", referenceLinks[i]["links"]);
    }
    console.log(Object.fromEntries(data));

    const url = product
      ? window.baseUrl + "admin/editProduct"
      : window.baseUrl + "admin/addProduct";
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["success"] === true) {
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
          setLoading(false);
        }
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
  useEffect(() => {
    if (formValues.discount_price === "") {
      setPercentageDiscount(0);
    } else if (formValues.price === "") {
      setFormErrors({ ...formErrors, discount_price: "enter price first" });
    } else {
      const percetage =
        (formValues.price - formValues.discount_price) / formValues.price;
      setPercentageDiscount(percetage * 100);
    }
  }, [formValues.discount_price]);

  const handleAddLinks = () => {
    setReferenceLinks([...referenceLinks, { links: "" }]);
  };
  const handleRemoveLinks = (index) => {
    const list = [...referenceLinks];
    list.splice(index, 1); //starting from index zero remove one service
    setReferenceLinks(list); //set links to new list
  };
  const handleLinksChange = (e, index) => {
    const { name, value } = e.target;
    console.log(e.target.name);
    const list = [...referenceLinks];
    list[index][name] = value;
    setReferenceLinks(list);
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
          style={{ width: "100%" }}
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
        />

        <p className="errors">{formErrors.product_name}</p>
        <h5 style={{ lineHeight: 0 }}>Price</h5>
        <InputField
          label={"Enter price"}
          name={"price"}
          inputStyle="input--shadow-purple"
          style={{ width: "100%" }}
          inputColor="purple-input"
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
          value={formValues.price}
        />
        <p className="errors">{formErrors.price}</p>
        <div
          className="class_justify_contents_row"
          style={{ justifyContent: "space-between" }}
        >
          <h5 style={{ lineHeight: 0 }}>Discount price</h5>
          <div
            className={
              percentageDiscount.toString().includes("-")
                ? "more_pop danger"
                : "more_pop"
            }
            dangerouslySetInnerHTML={{
              __html: `<span><h4> ${percentageDiscount.toFixed(
                2
              )}%  discount<h4></span>`,
            }}
          />
        </div>
        <InputField
          label={"Enter price"}
          name={"discount_price"}
          inputStyle="input--shadow-purple"
          style={{ width: "100%" }}
          inputColor="purple-input"
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
          value={formValues.discount_price}
        />
        <p className="errors">{formErrors.discount_price}</p>
        <h5 style={{ lineHeight: 0 }}>Quantity in Stock </h5>
        <InputField
          label={"Enter quantity of products in stock"}
          name={"quantity"}
          inputStyle="input--shadow-purple"
          style={{ width: "100%" }}
          inputColor="purple-input"
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
          value={formValues.quantity}
        />
        <p className="errors">{formErrors.quantity}</p>
        <h5>Add Sizes </h5>
        {referenceLinks.map((links, index) => (
          <div>
            <InputWithIcon
              // inputkey={index + 1}
              name="links"
              iconName={"bi:dash-square-fill"}
              style={{ width: "100%" }}
              inputHeight="37px"
              placeholder="Type here or select"
              onClickIcon={() => handleRemoveLinks(index)}
              onHandleChange={(e) => handleLinksChange(e, index)}
            />
            {referenceLinks.length - 1 === index && (
              <div
                style={{
                  color: "var(--light-purple)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                onClick={handleAddLinks}
              >
                <Icon icon="akar-icons:circle-plus-fill" fontSize={23} />
                <p>Add Another</p>
              </div>
            )}{" "}
          </div>
        ))}
        {/* <div className={{}}>
          <h5 style={{ lineHeight: 0 }}>Main category</h5>
          <DropDownField
            options={superCategories}
            selected={superCategory}
            setSelected={setSuperCategory}
          />
        </div> */}
        <div className={{}}>
          <h5>Categories</h5>
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
          style={{ width: "100%" }}
          name={"description"}
          onHandleChange={(e) => handleChange(e, formValues, setFormValues)}
          value={formValues.description}
        />
        <p className="errors">{formErrors.description}</p>

        <p className="errors">{responseError ?? ""}</p>
        {/* <p>{filespathList.join(",")}</p> */}
        <div
          style={{ width: "100%", gap: "5px", overflowX: "hidden" }}
          className="class_justify_contents_row"
        >
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
          {product ? "Update" : "Add"}
        </Button>
      </div>
    </>
  );
};

export default AddProducts;
