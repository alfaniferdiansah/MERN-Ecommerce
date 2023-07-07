import React from "react";
import { useSelector } from "react-redux";
import { selectAuth, selectLoading } from "../redux/userSelector";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const loading = useSelector(selectLoading);
  const auth = useSelector(selectAuth);

  if (loading === false) {
    if (!auth) {
      return <Navigate to="/login" />;
    }
    return children;
  }
};

export default ProtectedRoute;
