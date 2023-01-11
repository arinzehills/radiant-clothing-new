import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useFetch from "../../useFetch";
import GradientHeaders from "../GradientHeaders/GradientHeaders";
import LazyLoader from "../LazyLoader/LazyLoader";

import ProgressBar from "../ProgressBar/ProgressBar";
import { DummyData } from "./DummyData";
import "./Featured.css";
import ProductItem from "./ProductItem";
import ProductListItem from "./ProductListItem";

const Featured = () => {
  const {
    data: productsData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getProducts",
    // secondParam: activeRow,
  });
  const catLoadArr = ["", "", "", "", ""];

  const {
    data: categoriesData,
    loading: loadingCategory,
    errorCategory,
  } = useFetch({
    url: window.baseUrl + "admin/getCategories",
    // secondParam: activeRow,
  });
  console.log("productsData?.products");
  console.log(productsData?.products);
  !loading &&
    productsData?.products?.forEach((product, index) => {
      product.image = product.images[0];
    });
  !loadingCategory &&
    categoriesData?.categories.forEach((cat, index) => {
      // cat.image = cat.images[0];
      console.log(cat.category);
    });
  const [productsSet, setProductsSet] = useState(productsData?.products);

  return (
    <div>
      <Helmet>
        <title> Radiant Clothing - Home</title>
        <meta
          name="description"
          content="This is the recent work and projects handle by Arinze Chris H    ills"
        />
      </Helmet>
      <div
        style={{
          // marginTop: "-13rem",
          marginTop: "-8rem",
          width: "100vw",
          zIndex: 11,
          position: "absolute",
        }}
      >
        <GradientHeaders
          fontSize={"4.5vw"}
          text={"Featured"}
          subHeader={"Shop by Categories"}
          uppercase={true}
          showSubHeader={true}
        />
      </div>
      {/* <img
        src="/svg/radiantclothingphone.svg"
        alt=""
        style={{
          marginTop: "-21rem",
          paddingLeft: "22rem",
          marginRight: 0,
          zIndex: 0,
        }}
        height={"435px"}
        width={"100%"}
      /> */}

      <div
        style={{
          columnGap: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // marginTop: "-10rem",
          marginBottom: "10rem",
        }}
      >
        {/* where category/fetures heading starts  */}
        <div style={{}} className={"category-item-list"}>
          {loadingCategory
            ? catLoadArr.map((item) => (
                <LazyLoader
                  widthRatio={"59%"}
                  dontShowSecond={true}
                  height={"150px"}
                />
              ))
            : categoriesData?.categories.map((item) => (
                <Link
                  to={`/categories/${item.category}`}
                  key={item.category}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div
                    className="class_justify_contents_column "
                    style={{
                      height: "150px",
                      width: "150px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt="cat-image"
                      style={{ height: "90%", width: "90%" }}
                    />
                    {item.category}
                  </div>
                </Link>
              ))}
        </div>
      </div>
      {/* where the products/content starts */}
      <div
        style={{
          marginTop: "-8rem",
          width: "100vw",
          zIndex: 11,
          position: "absolute",
        }}
      >
        <GradientHeaders
          fontSize={"4.5vw"}
          text={"Products"}
          subHeader={"."}
          uppercase={true}
          showSubHeader={true}
        />
      </div>
      <ProductListItem
        // colorClass={productsSet.colorClass}
        // imgSrc={productsSet.image}
        loading={loading}
        products={productsData?.products}
      />
    </div>
  );
};

export default Featured;
