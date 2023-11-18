import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../../page/404";
const AdminLayout = ({ children }) => {
  const { isAuth, userData } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      {isAuth ? (
        userData.role === "admin" ? (
          <React.Fragment> {children} </React.Fragment>
        ) : (
          <React.Fragment>
            <ErrorPage />
          </React.Fragment>
        )
      ) : (
        <Navigate to="/login" replace />
      )}
    </React.Fragment>
  );
};

export default AdminLayout;
