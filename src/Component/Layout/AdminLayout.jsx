import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router";
import CommonHeader from "../Sidebar/Nabvar/CommonHeader";

function AdminLayout() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div id="app" className={showMenu ? "show" : "hide"}>
        <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
        <div id="main">
          <div className="header">
            <CommonHeader />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
