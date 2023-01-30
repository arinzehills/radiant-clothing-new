import React from "react";
import { useOutletContext } from "react-router-dom";
import NavComponent from "../../Dashboard/components/NavComponent/NavComponent";

const Orders = () => {
  const [click, setClick] = useOutletContext();
  const handleClick = () => setClick(!click);
  return (
    <div>
      <NavComponent
        personsName={"Admin"}
        showNotification={true}
        handleClick={handleClick}
        pageTitle="Orders"
        //   setHandleNotData={setHandleNotData}
      />
    </div>
  );
};

export default Orders;
