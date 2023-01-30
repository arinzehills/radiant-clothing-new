import React, { useState, useEffect } from "react";
import Table from "../../../components/Table/Table";
import useFetch from "../../../useFetch";
import useUser from "../../../useUser";
import NavComponent from "../components/NavComponent/NavComponent";

const UserOrders = () => {
  const { user, setUser } = useUser();
  const {
    data: categoriesData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "admin/getProducts",
    // secondParam: activeRow,
  });
  let columnData = [
    { heading: "Image", value: "image" },
    { heading: "Product Name", value: "product_name" },
    { heading: "Price", value: "price" },
    { heading: "Quantity", value: "description" },
    { heading: "Actions", value: "action" },
  ];
  return (
    <div>
      <NavComponent
        personsName={user.email ?? "Admin"}
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Orders"
        // setHandleNotData={setHandleNotData}
      />
      <Table
        loading={loading}
        data={categoriesData?.products}
        // data={tableData}
        columnData={columnData}
      />
    </div>
  );
};

export default UserOrders;
