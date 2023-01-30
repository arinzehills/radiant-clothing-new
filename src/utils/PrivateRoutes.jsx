import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useToken from "../useToken";
import { ClickableToast, toastOptions } from "../components/Featured/ProductItem";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PrivateRoutes = () => {
  const { token, setToken } = useToken();
  const location = useLocation()
  console.log(location)
useEffect(() => {
    console.log('location', location.key); 
    if(location.pathname==='/cart'){
      toast.success(<ClickableToast text="You have to login" />, toastOptions);
    }

}, [location.pathname]);
  return token ? <Outlet  /> : <Navigate to={"/login"} state={{ from: location.pathname }}
  
  />;
};

export default PrivateRoutes;
