import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const { pathname } = useLocation();
  const { email } = useSelector((state) => state.auth);

  if (email) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }
};

export default Protected;
