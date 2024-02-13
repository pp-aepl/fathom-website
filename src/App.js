
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Component/Sidebar/Nabvar/Navbar";
import Dashboard from "./Component/Dashboard/Dashboard";
import Login from "./Component/Auth/Login";
import List from "./Component/Common/ApplicationsList/List";
import Sidebar from "./Component/Sidebar/Sidebar";
import CustomeStepper from "./Component/Common/ApplicationForm/CustomeStepper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Use a wrapper route for /admin */}
      <Route path="/admin" element={<><Navbar /><Sidebar /></>} >
        {/* Dashboard route */}
        <Route path="dashboard" element={<Dashboard />} />
        {/* Application list route with dynamic parameter */}
        <Route path="application/:userId" element={<List />} />
        {/* Application ADD/UPDATE form route with dynamic parameter */}

        <Route path="add" element={<CustomeStepper/>} >
          
        </Route>

        {/* Default redirect for /admin */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Fallback route for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
