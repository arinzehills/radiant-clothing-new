import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import handleNot from "../../../components/HandleNotification/HandleNot";
import useToken from "../../../useToken";
import SupportUpload from "../Products/SupportUpload";

const AddImages = ({ setOpenModal }) => {
  const pickFileRef = React.useRef();
  const fileNamesRef = React.useRef();
  const { token, setToken } = useToken();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [filespathList, setFilespathList] = useState([]);
  const [loading, setLoading] = useState(false);
  const handlePickFiles = (e) => {
    setFilespathList([]);
    e.preventDefault();

    setFiles(e.target.files);
  };
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

  const handleClickMaterials = () => {
    pickFileRef.current.click();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };
  const addHomeImages = async () => {
    setLoading(true);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      // console.log(formValues.supporting_materials[i].name);
      data.append("image", files[i]);
    }
    console.log(Object.fromEntries(data));
    const url = window.baseUrl + "admin/addHomeImages?token=" + token;
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
          setError(error);
          setLoading(false);
        }
        // console.log('Success:', data);
      })
      .catch((error) => {
        setLoading(false);

        console.warn("Error:", error);
      });
  };
  console.log(filespathList);

  return (
    <div>
      <h1 style={{ lineHeight: 2, textAlign: "center" }}>Add Image</h1>{" "}
      <div
        style={{ width: "100%", gap: "5px", overflowX: "hidden" }}
        className="class_justify_contents_row"
      >
        {filespathList.map((image) => (
          <img src={image} height="50px" key={image} />
        ))}
      </div>
      <SupportUpload
        onClickBtn={handleClickMaterials}
        fileNamesRef={fileNamesRef}
        label="click to upload home page slider image"
      />
      <p className="errors">{error}</p>
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
        onClick={() =>
          filespathList.length == 0
            ? setError("Select at least one image")
            : addHomeImages()
        }
        loading={loading}
      >
        {loading ? "Uploading..." : "Add"}
      </Button>
    </div>
  );
};

export default AddImages;
