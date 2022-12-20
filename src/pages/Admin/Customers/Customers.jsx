import { Icon } from "@iconify/react";
import moment from "moment";
import React from "react";
import { Button } from "../../../components/Button/Button";
import Table from "../../../components/Table/Table";
import useFetch from "../../../useFetch";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";

const Customers = () => {
  const {
    data: categoriesData,
    loading,
    error,
  } = useFetch({
    url: window.baseUrl + "getAllCustomers",
    // secondParam: openModal,
  });
  let columnData = [
    // { heading: "Image", value: "image" },
    { heading: "Name", value: "full_name" },
    { heading: "Email", value: "email" },
    { heading: "User Type", value: "user_type" },
    { heading: "Member Since", value: "member_since" },
    // { heading: "Actions", value: "action" },
  ];
  !loading &&
    categoriesData?.forEach((product, index) => {
      product.member_since = (
        <div className="">
          {moment(product.createdAt).format("DD MMMM, YYYY")}
        </div>
      );
    });
  return (
    <div>
      <NavComponent
        personsName={"Admin"}
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Customers"
        //   setHandleNotData={setHandleNotData}
      />
      <Table
        loading={loading}
        data={categoriesData}
        // data={tableData}
        columnData={columnData}
      />
    </div>
  );
};

export default Customers;
