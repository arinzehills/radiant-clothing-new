import React from "react";
import IconAndCircle from "../IconAndCircle/IconAndCircle";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Products.css";

const ProductItem = ({ item, productsSet }) => {
  return (
    <>
      <div
        className="product-item class_justify_contents_column"
        style={{ alignItems: "flex-start" }}
      >
        <img
          src={`${item.image}`}
          // src={`/svg/${productsSet.image}.svg`}
          alt=""
          height={"230px"}
          width={"99%"}
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
            <h3 style={{ textAlign: "left" }}>
              {item.product_name ?? "HTML/CSS"}
            </h3>
            <p className="italics">items left</p>
            <ProgressBar
              percent={item.level}
              width={150}
              height={10}
              colorClass={productsSet.colorClass}
            />
          </div>
          {/* add cart icon */}
          <div>
            <IconAndCircle
              iconName={"mdi:cart-arrow-down"}
              colorClass={productsSet.colorClass}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
