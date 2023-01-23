import React, { useContext } from "react";
import SearchContext from "../../context/SearchContext";
import useFetch from "../../useFetch";
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
