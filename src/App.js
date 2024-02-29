
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<TwoFactor />} />

      {/* Use a wrapper route for /admin */}
    
      <Route path="/admin" element={<><Navbar /></>} >
        {/* Dashboard route */}
        <Route path="dashboard" element={<Dashboard />} />
        {/* Application list route with dynamic parameter */}
        <Route path="application/:userId" element={<List />} />
        {/* Application ADD/UPDATE form route with dynamic parameter */}
        <Route path="application/list" element={<NewList />} />
        <Route path="application/inProcess" element={<InprocessList />} />
        <Route path="application/murabaha" element={<MurabahaList />} />
        <Route path="application/sent" element={<SentList />} />
        <Route path="application/commodity" element={<CommodityList />} />

      

        {/* Default redirect for /admin */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Fallback route for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
