import { memo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ authorized }) => {
  const location = useLocation();
  const userToken = localStorage.getItem("token");

  return (
    <>
      {authorized || userToken ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
      )}
    </>
  );
};

export default memo(RequireAuth);
