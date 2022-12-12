import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import AnimatedModal from "../../../components/AnimatedModal/AnimatedModal";
import { Button } from "../../../components/Button/Button";
import CustomTab from "../../../components/CustomTab/CustomTab";
import Table from "../../../components/Table/Table";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";
import AddProducts from "./AddProducts";
import Categories from "./Categories";
import { ReactNotifications } from "react-notifications-component";
import useFetch from "../../../useFetch";

const Products = ({ setHandleNotData }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const {
    data: categoriesData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getProducts",
    // secondParam: activeRow,
  });
  console.log(categoriesData);
  const tableData = [
    {
      product_name: "Content Marketing",
      description: "achill@gmail.com",
      price: "904343",
      image: <img src="/images/logo.png" height={100} />,
      action: (
        <div className="class_justify_contents_row">
          <Button
            buttonColor={"black"}
            children={"Edit"}
            style={{ background: "var(--success)", width: "100px" }}
          />
          <Icon icon="ic:baseline-delete" color="var(--danger)" />
        </div>
      ),
    },
    {
      product_name: "Content Marketing",
      description: "achill@gmail.com",
      price: "32",
      image: (
        <img src="/images/white_shopping.jpg" height={100} width={"100px"} />
      ),
      action: (
        <div className="class_justify_contents_row">
          <Button
            buttonColor={"black"}
            children={"Edit"}
            style={{ background: "var(--success)", width: "100px" }}
          />
          <Icon icon="ic:baseline-delete" color="var(--danger)" />
        </div>
      ),
    },
  ];
  let columnData = [
    { heading: "Image", value: "image" },
    { heading: "Product Name", value: "product_name" },
    { heading: "Price", value: "price" },
    { heading: "Description", value: "description" },
    { heading: "Actions", value: "action" },
  ];
  // useEffect(() => {
  !loading &&
    categoriesData?.products.forEach((product, index) => {
      // productegoriesImage.push(image);
      console.log(product.images[0]);
      console.log(product.images[0]);
      product.image = product.images[0];
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
  // }, [loading]);
  return (
    <>
      <ReactNotifications />
      <AnimatedModal openModal={openModal} setOpenModal={setOpenModal}>
        <AddProducts
          setHandleNotData={setHandleNotData}
          setOpenModal={setOpenModal}
        />
      </AnimatedModal>
      <NavComponent
        personsName={"Admin"}
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Products"
        setHandleNotData={setHandleNotData}
      />
      <div
        style={{
          display: "flex",
          flexDirection: window.innerWidth < 600 && "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomTab
          tabs={["All", "Categories"]}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabsComponents={[
            <Table
              loading={loading}
              data={categoriesData?.products}
              // data={tableData}
              columnData={columnData}
            />,
            <Categories setHandleNotData={setHandleNotData} />,
          ]}
        />
        <Button
          buttonStyle={"btn--normal"}
          buttonColor="gold"
          onClick={() => setOpenModal(true)}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Icon
              icon="material-symbols:add-circle-outline"
              fontSize={"20px"}
            />
            Add Products
          </div>
        </Button>
      </div>
    </>
  );
};

export default Products;