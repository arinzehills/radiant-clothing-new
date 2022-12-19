import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "../../../components/Button/Button";
import ImageSlider from "../../../components/HeroSlider/ImageSlider";
import Table from "../../../components/Table/Table";
import useFetch from "../../../useFetch";
import useUser from "../../../useUser";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";

const SliderImages = () => {
  const { user, setUser } = useUser();
  const {
    data: categoriesData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getProducts",
    // secondParam: activeRow,
  });
  let columnData = [
    { heading: "S/N", value: "sn" },
    { heading: "Image", value: "image" },
    { heading: "Actions", value: "action" },
  ];
  const slides = [
    {
      title: "Radiant Clothin ",
      description: "the best e-shop,makes u glow",
      img: "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786719/cld-sample-5.jpg",
    },
    {
      title: "Shopping the best way you can",
      description: "Radiant allows you to shop\nfrom the comforts of you home",
      img: "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786717/cld-sample.jpg",
    },
  ];
  !loading &&
    categoriesData?.products.forEach((product, index) => {
      // productegoriesImage.push(image);
      console.log(product.images[0]);
      console.log(product.images[0]);
      product.image = product.images[0];
      product.sn = index + 1;

      product.action = (
        <div className="class_justify_contents_row">
          <Button
            buttonColor={"black"}
            children={"Edit"}
            style={{ background: "var(--success)", width: "100px" }}
          />
          <Icon icon="ic:baseline-delete" color="var(--danger)" />
        </div>
      );
    });
  return (
    <div>
      <NavComponent
        personsName={user.email ?? "Admin"}
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Home page images"
        // setHandleNotData={setHandleNotData}
      />
      <div className="class_justify_contents_column">
        <ImageSlider
          slides={slides}
          style={{ height: "300px", width: "80%" }}
        />
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
        data={categoriesData?.products}
        // data={tableData}
        columnData={columnData}
      />
    </div>
  );
};

export default SliderImages;
