import ProductItem from "./ProductItem";
import React from "react";

const ProductListItem = ({ products, loading }) => {
  return (
    <div className="product-list-item">
      {loading ? (
        <div
          style={{
            display: "flex",

            flexDirection: "row",
            width: "100%",
          }}
        >
          <ProductItem loading={loading} />
        </div>
      ) : (
        products.map((item) => (
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
