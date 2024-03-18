/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate, Outlet, Router } from "react-router-dom";
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
import React, { useCallback, useEffect, useState } from "react";
import SidebarRoutes from "./Component/Sidebar/Nabvar/sidebar_new";
import RequireAuth from "./Component/Auth/useAuth";
import "./App.css";
import UserLayout from "./Component/Layout/UserLayout";
import AdminLayout from "./Component/Layout/AdminLayout";
import ForgotPassword from "./Component/Auth/ForgotPassword";
import ChangePassword from "./Component/Auth/ChangePassword";
import OpenModal from "./Component/PopupModal/OpenModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  fetchAllRulesList,
} from "./Config/FetchListingData";
import IsAlreadyLoggedIn from "./Component/Auth/IsAlreadyLoggedIn";
import AlreadyLoggedIn from "./Component/Auth/AlreadyLoggedIn";
// import "./styles.css"

// function App() {
//   const [state, setState] = useState({});
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const [isSidebar,setIsSidebar] = useState(false)
//   let isSidebar = "SIDEBAR";
//   // Function to handle login
//   const handleLogin = (userData) => {
//     // Perform login logic and set isLoggedIn to true
//     // You can access userData.username and userData.password here
//     console.log("User Data:", userData);
//     setIsLoggedIn(true);
//   };

//   const handleClick = (e, item) => {
//     e.stopPropagation();
//     setState((state) => ({
//       ...state,
//       [item]: !state[item],
//     }));
//   };

//   const handler = (children, isSidebar) => {
//     console.log(isSidebar, "======>30");
//     return children.map((child, i) => {
//       const category = !child.category ? null : (
//         <div className="nav-item category">{child.category}</div>
//       );

//       // Render the sidebar items only if the user is logged in
//       if (isSidebar === "SIDEBAR") {
//         console.log(
//           isLoggedIn,
//           "isLoggedInisLoggedInisLoggedInisLoggedIn",
//           isSidebar
//         );
//         //  return null;
//       }
//       if (!child.children) {
//         return (
//           <>
//             {category}
//             <li onClick={(e) => handleClick(e, child.name)} key={i}>
//               <a className="nav-link" href={child.url}>
//                 <div className="icon">{child.icon ? child.icon : ""}</div>
//                 <span>{child.name}</span>
//               </a>
//             </li>
//           </>
//         );
//       } else {
//         return (
//           <>
//             {category}
//             <li onClick={(e) => handleClick(e, child.name)} key={i}>
//               <div className="nav-link">
//                 <div className="icon"></div>
//                 <span>{child.name}</span>
//               </div>
//               <ul className={`nav-submenu ${state[child.name] ? "open" : ""}`}>
//                 {handler(child.children)}
//               </ul>
//             </li>
//           </>
//         );
//       }
//     });
//   };

//   // return (
//   //   <>
//   //     <Routes>
//   //       <Route path="/" element={<Login />} />
//   //       <Route path="/otp" element={<TwoFactor />} />

//   //       {/* Use a wrapper route for /admin */}

//   //       <Route
//   //         path="/admin"
//   //         element={
//   //           <>
//   //             <Navbar />

//   //           </>
//   //         }
//   //       >
//   //         {/* Dashboard route */}
//   //         <Route path="dashboard" element={<Dashboard />} />
//   //         {/* Application list route with dynamic parameter */}
//   //         <Route path="application/:userId" element={<List />} />
//   //         {/* Application ADD/UPDATE form route with dynamic parameter */}
//   //         <Route path="application/list" element={<NewList />} />
//   //         <Route path="application/inProcess" element={<InprocessList />} />
//   //         <Route path="application/murabaha" element={<MurabahaList />} />
//   //         <Route path="application/sent" element={<SentList />} />
//   //         <Route path="application/commodity" element={<CommodityList />} />
//   //         <Route path="reports/:reportList" element={<ReportList />} />

//   //         {/* Default redirect for /admin */}
//   //         <Route index element={<Navigate to="dashboard" replace />} />
//   //       </Route>

//   //       {/* Fallback route for unknown paths */}
//   //       <Route path="*" element={<Navigate to="/" replace />} />
//   //     </Routes>
//   //     {/* <div className="App">
//   //       <div className="main-wrapper">
//   //         <aside className="sidebar">
//   //           <div className="sidebar-header" />
//   //           <ul className="nav">{handler(SidebarRoutes)}</ul>
//   //         </aside>
//   //         <main className="content" />
//   //       </div>
//   //     </div> */}
//   //   </>
//   // );
//   return (
//     <>
//       {console.log(isLoggedIn, isSidebar)}

//       {(!isLoggedIn || isSidebar != "SIDEBAR") && (
//         <Routes>
//           <Route path="/" element={<Login handleLogin={handleLogin} />} />
//           <Route path="/otp" element={<TwoFactor />} />
//         </Routes>
//       )}

//       {isSidebar === "SIDEBAR" && (
//         <div className="main-wrapper">
//           <aside className="sidebar">
//             <div className="sidebar-header" />
//             <ul className="nav">{handler(SidebarRoutes, isSidebar)}</ul>
//           </aside>
//           <div className="content">
//             <Routes>
//               <Route path="/admin/dashboard" element={<Dashboard />} />
//               <Route path="/admin/application/:userId" element={<List />} />
//               <Route path="/admin/application/list" element={<NewList />} />
//               <Route
//                 path="/admin/application/inProcess"
//                 element={<InprocessList />}
//               />
//               <Route
//                 path="/admin/application/murabaha"
//                 element={<MurabahaList />}
//               />
//               <Route path="/admin/application/sent" element={<SentList />} />
//               <Route
//                 path="/admin/application/commodity"
//                 element={<CommodityList />}
//               />
//               <Route
//                 path="/admin/reports/:reportList"
//                 element={<ReportList />}
//               />

//               <Route index element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       )}

//       {/*
//    {!isLoggedIn  &&
//      <Routes>
//      <Route path="/" element={<Login handleLogin={handleLogin} />} />
//      <Route path="/otp" element={<TwoFactor />} />

//    </Routes>

//    } */}
//     </>
//   );
// }

// export default App;

function App() {
  const userToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);
  const fetchListingData = useCallback(async () => {
    try {
      await dispatch(fetchAllRulesList());
      await dispatch(fetchAllCategories());
    } catch (error) {
      console.log(error, "error");
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser?.data?._id) {
      fetchListingData();
    }
  }, [fetchListingData]);
  return (
    <>
      <OpenModal />
      <Routes>
        <Route element={<UserLayout />}>
          <Route
            element={
              <IsAlreadyLoggedIn authorized={userToken ? true : false} />
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<TwoFactor />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/changePassword/:_id?" element={<ChangePassword />} />
            <Route path="/already_logged_in" element={<AlreadyLoggedIn />} />
          </Route>
        </Route>
        <Route element={<RequireAuth authorized={userToken ? true : false} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="application/:status?" element={<List />} />
            <Route path="application/list" element={<NewList />} />
            <Route path="application/inProcess" element={<InprocessList />} />
            <Route path="application/murabaha" element={<MurabahaList />} />
            <Route path="application/sent" element={<SentList />} />
            <Route path="application/commodity" element={<CommodityList />} />
            <Route path="reports/:reportList" element={<ReportList />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
