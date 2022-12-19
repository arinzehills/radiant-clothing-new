import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export const Dashboard = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div>
      <Sidebar click={click} handleClick={handleClick} setClick={setClick} />
      <div className="section">
        {/* <NavComponent handleClick={handleClick} /> */}
        <Outlet context={[click, setClick]} />
      </div>
    </div>
  );
};
