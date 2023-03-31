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
import { useNavigate, useOutletContext } from "react-router-dom";
import handleDelete from "../../../utils/handleDelete";
import getSymbolFromCurrency from "currency-symbol-map";
import { FiEdit } from "react-icons/fi";

const Products = ({ setHandleNotData }) => {
  const [click, setClick] = useOutletContext();
  const handleClick = () => setClick(!click);
  const [product, setProduct] = useState();
  const [currentTab, setCurrentTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const history = useNavigate();

  const {
    data: categoriesData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getProducts",
    secondParam: openModal,
  });

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
            children={"Editss"}
            style={{ background: "var(--success)", width: "100px" }}
          />
          <Icon
            icon="ic:baseline-delete"
            // color="var(--danger)"
            style={{ fontSize: "1.5rem" }}
          />
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
    { heading: "Selling Price", value: "discount_price" },
    { heading: "Price", value: "price" },
    { heading: "Description", value: "description" },
    { heading: "Category", value: "category" },
    { heading: "Actions", value: "action" },
  ];
  // useEffect(() => {
  !loading &&
    categoriesData?.products.forEach((product, index) => {
      // productegoriesImage.push(image);
      product.image = product.images[0];
      product.action = (
        <div className="class_justify_contents_row">
          <Button
            buttonColor={"black"}
            children={"Edit"}
            onClick={() => {
              setProduct(product), setOpenModal(true);
            }}
            style={{ background: "var(--success)", width: "100px" }}
          />
          <Icon
            icon="ic:baseline-delete"
            color="var(--danger)"
            style={{ fontSize: "1.2rem" }}
            onClick={() =>
              handleDelete(
                window.baseUrl + "admin/deleteProduct?id=" + product._id,
                setOpenModal
              )
            }
          />
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
          product={product}
        />
      </AnimatedModal>

      <NavComponent
        personsName={"Admin"}
        showNotification={true}
        handleClick={handleClick}
        pageTitle="Products"
        setHandleNotData={setHandleNotData}
      />
      <div
        className="admin_products-heading-section"
        style={{
          display: "flex",
          flexDirection: window.innerWidth < 600 && "column",
          justifyContent: "space-between",
          alignItems: window.innerWidth > 600 && "center",
        }}
      >
        {" "}
        <div className="class_justify_contents_row" style={{ gap: "1rem" }}>
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
                onClickRow={(product) => {
                  history(
                    `/admin/products/${product.product_name}-${product._id}`
                  );
                }}
              />,
              <Categories setHandleNotData={setHandleNotData} />,
            ]}
          />
        </div>
        <Button
          buttonStyle={"btn--normal"}
          buttonColor="gold"
          onClick={() => {
            setProduct(), setOpenModal(true);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
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
