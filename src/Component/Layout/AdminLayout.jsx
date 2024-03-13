import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <>
      <div id="app">
        <Sidebar />
        <div id="main">
          <div className="header"></div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
