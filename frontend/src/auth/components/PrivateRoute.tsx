import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../../services/authServices";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!isLoggedIn()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
