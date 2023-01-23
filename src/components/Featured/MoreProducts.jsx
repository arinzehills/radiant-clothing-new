import React, { useContext } from "react";
import SearchContext from "../../context/SearchContext";
import useFetch from "../../useFetch";
import GradientHeaders from "../GradientHeaders/GradientHeaders";
import ProductListItem from "./ProductListItem";

const MoreProducts = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const {
    data: productsData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getProducts",
    // secondParam: activeRow,
  });
  return (
    <div>
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
          subHeader={"More products"}
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

export default MoreProducts;
