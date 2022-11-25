import React from "react";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";

const Orders = () => {
  return (
    <div>
      <NavComponent
        personsName={"Admin"}
        showNotification={true}
        //   handleClick={handleClick}
        pageTitle="Orders"
        //   setHandleNotData={setHandleNotData}
      />
    </div>
  );
};

export default Orders;
