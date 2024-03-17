import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router";

function AdminLayout() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div id="app" className={showMenu ? "show" : "hide"}>
        <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
        <div id="main">
          <div className="header"></div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
