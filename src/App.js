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
  getDashboardData,
} from "./Config/FetchListingData";
import IsAlreadyLoggedIn from "./Component/Auth/IsAlreadyLoggedIn";
import AlreadyLoggedIn from "./Component/Auth/AlreadyLoggedIn";

function App() {
  const userToken = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);
  const fetchListingData = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(getDashboardData()),
        dispatch(fetchAllRulesList()),
        dispatch(fetchAllCategories()),
      ]);
    } catch (error) {
      console.log(error, "error");
    }
  }, [authUser?.data,dispatch]);
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
            <Route path="/already_logged_in" element={<AlreadyLoggedIn />} />
          </Route>
          <Route path="/otp" element={<TwoFactor />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/changePassword/:_id?" element={<ChangePassword />} />
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
