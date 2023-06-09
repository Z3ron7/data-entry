import React from "react";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          navigate('/', { state: { from: rest.location } })
        )
      }
    />
  );
};

export default ProtectedRoute;
