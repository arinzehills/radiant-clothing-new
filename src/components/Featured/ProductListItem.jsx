import ProductItem from "./ProductItem";
import React from "react";
import LazyLoader from "../LazyLoader/LazyLoader";
import { Link } from "react-router-dom";

const ProductListItem = ({ products, loading }) => {
  const catLoadArr = ["", "", "", "", "", "", "", ""];
  console.log(loading);
  return (
    <div className="product-list-item">
      {loading ? (
        <div className="product-list-item">
          {catLoadArr.map((item) => (
            <LazyLoader key={item} />
          ))}
        </div>
      ) : (
        products?.map((item) => (
          // <div classname="class_justify_contents_row">
          <div
            style={{
              display: "flex",

              flexDirection: "row",
              width: "100%",
            }}
            key={item.id}
          >
            <ProductItem
              item={item}
              //   productsSet={productsSet}
              loading={loading}
            />
          </div>
        ))
      )}
    </div>
  );
};
export default ProductListItem;
