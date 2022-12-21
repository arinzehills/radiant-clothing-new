import React from "react";
import IconAndCircle from "../IconAndCircle/IconAndCircle";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Products.css";
import getSymbolFromCurrency from "currency-symbol-map";
import { Icon } from "@iconify/react";
import LazyLoader from "../LazyLoader/LazyLoader";

const ProductItem = ({ item, productsSet, loading }) => {
  const catLoadArr = ["", "", ""];

  return (
    <>
      {loading ? (
        catLoadArr.map((item) => <LazyLoader key={item} />)
      ) : (
        <div
          className="product-item class_justify_contents_column"
          style={{ alignItems: "flex-start" }}
        >
          <img
            src={`${item.image}`}
            // src={`/svg/${productsSet.image}.svg`}
            className="product-item-image"
            alt=""
          />
          {/* this is body contents */}
          <div
            style={{
              padding: "1rem",
              justifyContent: "space-between",
              width: "87%",
            }}
            className={"class_justify_contents_row"}
          >
            <div>
              {/* first cart content */}
              <pre
                style={{ textAlign: "left", lineHeight: 0 }}
                className={"avenir_class gold_color_text"}
              >
                {item.category ?? "HTML/CSS"}
              </pre>
              <h3 style={{ textAlign: "left" }}>
                {item.product_name ?? "HTML/CSS"}
              </h3>
              <p className="italics" style={{ fontSize: "21px" }}>
                {getSymbolFromCurrency("INR") + item.price}
              </p>
              {/* <ProgressBar
              percent={item.level}
              width={150}
              height={10}
              colorClass={productsSet.colorClass}
            /> */}
            </div>
            {/* add cart icon */}
            <div className="class_justify_contents_row">
              <Icon
                icon={"mdi:cart-arrow-down"}
                color="black"
                fontSize={"25px"}
                className={"product-item-icon"}
              />
              <pre className="showTip">Add to Cart</pre>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default ProductItem;
