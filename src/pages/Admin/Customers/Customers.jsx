import React from "react";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";

const Customers = () => {
  return (
    <div>
      <NavComponent
        personsName={"Admin"}
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Customers"
        //   setHandleNotData={setHandleNotData}
      />
    </div>
  );
};

export default Customers;
