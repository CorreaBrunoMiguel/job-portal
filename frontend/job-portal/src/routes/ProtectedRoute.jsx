import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ requireRole }) => {
  // TODO: será implementada depois
  return <Outlet />;
};

export default ProtectedRoute;
