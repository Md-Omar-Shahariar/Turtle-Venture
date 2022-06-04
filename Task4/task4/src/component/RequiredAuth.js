import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";

const RequiredAuth = ({ children }) => {
  let location = useLocation();

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>loading</p>;
  }

  // console.log(user);
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequiredAuth;
