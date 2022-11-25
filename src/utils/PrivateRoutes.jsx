import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useToken from "../useToken";

const PrivateRoutes = () => {
  const { token, setToken } = useToken();

  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
