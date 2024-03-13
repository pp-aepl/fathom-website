import React from "react";
import Header from "../Sidebar/Nabvar/Header";
import { Outlet } from "react-router";

function UserLayout() {
  return <>
    <Header />
    <Outlet />
  </>;
}

export default UserLayout;
