import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Contexts/Auth";

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  return authContext.token ? children : <Navigate replace to="/register" />;
};

export default PrivateRoute;
