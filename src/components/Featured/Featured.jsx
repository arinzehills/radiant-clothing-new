import React, { useState } from "react";
import { Helmet } from "react-helmet";
import GradientHeaders from "../GradientHeaders/GradientHeaders";

import ProgressBar from "../ProgressBar/ProgressBar";
import "./Featured.css";
import ProductItem from "./ProductItem";

const Featured = () => {
  const data = [
    {
      category: "Clothing",
      colorClass: "gold_color",
      ProductsSet: [
        //all products in the category
        {
          product_name: "HTML/CSS",
          image:
            "https://res.cloudinary.com/djsk1t9zp/image/upload/v1665741860/cld-sample-5.jpg",
          price: "232 INR",
          level: 0.96,
        },
        {
          product_name: "Red Top",
          level: 0.91,
          image:
            "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786704/samples/ecommerce/accessories-bag.jpg",
        },
        {
          product_name: "Gucci vex",
          level: 0.91,
          image:
            "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786698/samples/people/smiling-man.jpg",
        },
        {
          product_name: "Versace",
          level: 0.82,
          image:
            "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786698/samples/people/smiling-man.jpg",
        },
        {
          product_name: "Crimson braown",
          level: 0.91,
          image:
            "https://res.cloudinary.com/djsk1t9zp/image/upload/v1665741860/cld-sample-5.jpg",
        },
        {
          product_name: "Mens Top",
          level: 0.91,
          image:
            "https://res.cloudinary.com/djsk1t9zp/image/upload/v1665741860/cld-sample-5.jpg",
        },
        {
          product_name: "Unisex Top",
          level: 0.82,
          image:
            "https://res.cloudinary.com/djsk1t9zp/image/upload/v1665741860/cld-sample-5.jpg",
        },
        {
          product_name: "Unisex Top",
          level: 0.82,
          image:
            "https://res.cloudinary.com/djsk1t9zp/image/upload/v1665741860/cld-sample-5.jpg",
        },
      ],
    },
    {
      category: "Shoes",
      image: "mobileapplaptop",
      colorClass: "blue",
      ProductsSet: [
        { product_name: "Timberland", level: 0.96 },
        { product_name: "Sneakers", level: 0.56 },
      ],
    },
    {
      category: "Bags",
      image: "frontendlaptop",
      colorClass: "light-blue",
      ProductsSet: [
        { product_name: "Womens White", level: 0.96 },
        { product_name: "Yes ds", level: 0.59 },
      ],
    },
    {
      category: "Watches",
      image: "mobileapplaptop",
      colorClass: "orange",
      ProductsSet: [
        {
          product_name: "Gold Wrist white",
          level: 0.96,
          image:
            "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786694/samples/ecommerce/analog-classic.jpg",
        },
        {
          product_name: "Silver Scroll Watch",
          level: 0.86,
          image:
            "https://res.cloudinary.com/difxlvoq8/image/upload/v1665786694/samples/ecommerce/analog-classic.jpg",
        },
      ],
    },
    {
      category: "design",
      image:
        "https://res.cloudinary.com/djsk1t9zp/image/upload/v1665741860/cld-sample-5.jpg",
      colorClass: "purple",
      ProductsSet: [
        { product_name: "Suite", level: 0.81 },
        { product_name: "Women Tops", level: 0.49 },
      ],
    },
  ];
  const [productsSet, setProductsSet] = useState(data[0]);

  const ProductListItem = ({}) => {
    return (
      <div className="product-list-item">
        {productsSet.ProductsSet.map((item) => (
          // <div classname="class_justify_contents_row">
          <div
            style={{
              display: "flex",

              flexDirection: "row",
              width: "100%",
            }}
          >
            <ProductItem item={item} productsSet={productsSet} />
          </div>
        ))}
      </div>
    );
  };

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
          subHeader={"Featured Category"}
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
          marginTop: "-1rem",
        }}
      >
        {/* where category/fetures heading starts  */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {data.map((item, index) => (
            <div className="class_justify_contents_column" key={index}>
              <div
                className={`skills_select ${item.colorClass} class_justify_contents_column`}
                onClick={() => setProductsSet(item)}
              >
                <img src={`/svg/${item.icon}.svg`} alt="" height={"30px"} />
                <p
                  className="avenir_class"
                  style={{
                    textTransform: "capitalize",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "10px",
                    paddingTop: "5px",
                  }}
                >
                  {item.category}
                </p>
              </div>
              {productsSet.colorClass === item.colorClass && (
                <ProgressBar
                  percent={1}
                  width={70}
                  colorClass={productsSet.colorClass}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* where the products/content starts */}

      <ProductListItem
        colorClass={productsSet.colorClass}
        imgSrc={productsSet.image}
      />
    </div>
  );
};

export default Featured;
