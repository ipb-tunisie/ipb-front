import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../../page/404";

const ClientLayout = ({ children }) => {
  const { isAuth, userData } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      {isAuth ? (
        userData.role === "client" ? (
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

export default ClientLayout;
