import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import AnimatedModal from "../../../components/AnimatedModal/AnimatedModal";
import { Button } from "../../../components/Button/Button";
import ImageSlider from "../../../components/HeroSlider/ImageSlider";
import Loader from "../../../components/Loader/Loader";
import Loader2 from "../../../components/Loader2/Loader2";
import Table from "../../../components/Table/Table";
import GradientText from "../../../components/utilitiescomponent/GradientText";
import useFetch from "../../../useFetch";
import useUser from "../../../useUser";
import handleDelete from "../../../utils/handleDelete";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";
import AddImages from "./AddImages";

const SliderImages = () => {
  const { user, setUser } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const {
    data: categoriesData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getHomeimages",
    secondParam: openModal,
  });
  console.log(categoriesData);
  let columnData = [
    { heading: "S/N", value: "sn" },
    { heading: "Image", value: "image" },
    { heading: "Delete", value: "delete" },
  ];
  const slides1 = [
    {
      title: "Radiant Clothin ",
      description: "the best e-shop,makes u glow",
      image:
        "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786719/cld-sample-5.jpg",
    },
  ];

  !loading &&
    categoriesData?.images.forEach((product, index) => {
      product.sn = index + 1;
      product.delete = (
        <Icon
          onClick={() =>
            handleDelete(
              window.baseUrl + "admin/deleteHomeimage?id=" + product._id,
              setOpenModal
            )
          }
          icon="ic:baseline-delete"
          color="var(--danger)"
          style={{ paddingLeft: "20px", fontSize: "1.5rem" }}
        />
      );
    });
  console.log(categoriesData?.images);
  return (
    <div>
      <ReactNotifications />
      <AnimatedModal
        modalHeight={"400px"}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <AddImages
          // setHandleNotData={setHandleNotData}
          setOpenModal={setOpenModal}
        />
      </AnimatedModal>
      <NavComponent
        personsName={user.email ?? "Admin"}
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Home page images"
        // setHandleNotData={setHandleNotData}
      />
      <div className="class_justify_contents_column">
        {loading ? (
          <div
            className="class_justify_contents_column"
            style={{
              maxHeight: "100px",
              height: "600px",
              width: "100%",
            }}
          >
            <GradientText
              text={" RADIANT CLOTHING "}
              style={{ lineHeight: 1, fontSize: "2vw", textAlign: "left" }}
            />
          </div>
        ) : (
          categoriesData?.images.length !== 0 && (
            <ImageSlider
              slides={categoriesData?.images}
              style={{ height: "300px", width: "80%" }}
            />
          )
        )}
      </div>
      <div style={{}}>
        <Button
          buttonStyle={"btn--normal"}
          buttonColor="orange"
          style={{ color: "white " }}
          onClick={() => setOpenModal(true)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Icon
              icon="material-symbols:add-circle-outline"
              fontSize={"20px"}
            />
            Add Images
          </div>
        </Button>
      </div>
      <Table
        loading={loading}
        data={categoriesData?.images}
        // data={tableData}
        columnData={columnData}
      />
    </div>
  );
};

export default SliderImages;
