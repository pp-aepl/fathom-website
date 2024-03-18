/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function IsAlreadyLoggedIn({ authorized }) {
  const location = useLocation();
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const gotoAlreadyLogin = () => {
    navigate("/already_logged_in");
  };
  const gotoPage = () => {
    let path = location.pathname;
    navigate(path == "/already_logged_in" ? -1 : path);
  };
  useEffect(() => {
    userToken ? gotoAlreadyLogin() : gotoPage();
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default IsAlreadyLoggedIn;
