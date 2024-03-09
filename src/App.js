
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Sidebar/Nabvar/Navbar";
import Dashboard from "./Component/Dashboard/Dashboard";
import Login from "./Component/Auth/Login";
import List from "./Component/Common/ApplicationsList/List";
import Sidebar from "./Component/Sidebar/Sidebar";
import TwoFactor from "./Component/Auth/TwoFactor";
import NewList from "./Component/Common/ApplicationsList/NewList";
import InprocessList from "./Component/Common/ApplicationsList/ApplicationProcessSteps/InprocessList";
import MurabahaList from "./Component/Common/ApplicationsList/MurabahaAgreement/MurabahaList";
import SentList from "./Component/Common/ApplicationsList/MurabahaAgreement/SentList";
import CommodityList from "./Component/Common/ApplicationsList/CommodityTrade/CommodityList";
import ReportList from "./Component/Common/Reports/ReportList";
import React, { useState } from "react";
import SidebarRoutes from "./Component/Sidebar/Nabvar/sidebar_new";
import "./App.css";
// import "./styles.css"


function App() {
  const [state, setState] = useState({});

  const handleClick = (e, item) => {
    e.stopPropagation();
    setState(state => ({
      ...state,
      [item]: !state[item]
    }));
  };

  const handler = children => {
    return children.map((child, i) => {
      const category = !child.category ? null : (
        <div className="nav-item category">{child.category}</div>
      );
      if (!child.children) {
        return (
          <>
            {category}
            <li onClick={e => handleClick(e, child.name)} key={i}>
              <a className="nav-link" href={child.url}>
                <div className="icon">{child.icon ? child.icon : ""}</div>
                <span>{child.name}</span>
              </a>
            </li>
          </>
        );
      }
      return (
        <>
          {category}
          <li onClick={e => handleClick(e, child.name)} key={i}>
            <div className="nav-link">
              <div className="icon"></div>
              <span>{child.name}</span>
            </div>
            <ul className={`nav-submenu ${state[child.name] ? "open" : ""}`}>
              {handler(child.children)}
            </ul>
          </li>
        </>
      );
    });
  };

  return (
    <div className="App">
      <div className="main-wrapper">
        <aside className="sidebar">
          <div className="sidebar-header" />
          <ul className="nav">{handler(SidebarRoutes)}</ul>
        </aside>
        <main className="content" />
      </div>
    </div>
  );
}

export default App;









// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/otp" element={<TwoFactor />} />

//       {/* Use a wrapper route for /admin */}
    
//       <Route path="/admin" element={<><Navbar /></>} >
//         {/* Dashboard route */}
//         <Route path="dashboard" element={<Dashboard />} />
//         {/* Application list route with dynamic parameter */}
//         <Route path="application/:userId" element={<List />} />
//         {/* Application ADD/UPDATE form route with dynamic parameter */}
//         <Route path="application/list" element={<NewList />} />
//         <Route path="application/inProcess" element={<InprocessList />} />
//         <Route path="application/murabaha" element={<MurabahaList />} />
//         <Route path="application/sent" element={<SentList />} />
//         <Route path="application/commodity" element={<CommodityList />} />
//         <Route path="reports/:reportList" element={<ReportList />} />

      

//         {/* Default redirect for /admin */}
//         <Route index element={<Navigate to="dashboard" replace />} />
//       </Route>

//       {/* Fallback route for unknown paths */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;
