import ProductItem from "./ProductItem";
import React, { useContext } from "react";
import LazyLoader from "../LazyLoader/LazyLoader";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SearchContext from "../../context/SearchContext";
import { Button } from "../Button/Button";

const ProductListItem = ({ products, loading }) => {
  const catLoadArr = ["", "", "", "", "", "", "", ""];
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  console.log(products);
  return (
    <>
      <div className="product-list-item">
        {loading ? (
          <div className="product-list-item">
            {catLoadArr.map((item) => (
              <LazyLoader key={item} />
            ))}
          </div>
        ) : (
          products
            ?.filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.product_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                val.category.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item) => (
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
    </>
  );
};
export default ProductListItem;
