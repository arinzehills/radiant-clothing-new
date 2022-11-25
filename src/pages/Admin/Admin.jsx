import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

const Admin = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <AdminSidebar
        click={click}
        handleClick={handleClick}
        setClick={setClick}
      />

      <div className="section">
        {/* <NavComponent handleClick={handleClick} /> */}
        <Outlet context={[click, setClick]} />
      </div>
    </>
  );
};

export default Admin;
