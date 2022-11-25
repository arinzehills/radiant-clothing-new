import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useToken from "../useToken";
import useUser from "../useUser";

const AdminPrivateRoute = () => {
  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  return !token ? (
    <Navigate to={"/adminlogin"} />
  ) : user?.user_type !== "admin" ? (
    <Navigate to={"/adminlogin"} />
  ) : (
    <Outlet />
  );
};

export default AdminPrivateRoute;
