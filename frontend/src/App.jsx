import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import SignUp from "./Pages/SignUp/SignUp";
import RoleSelection from "./Pages/RoleSelection/RoleSelection";
import LearnerDashboard from "./Pages/LearnerDashboard/LearnerDashboard";
import ModelPage from "./Pages/ModelPage/ModelPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/dashboard" element={<LearnerDashboard />} />
        <Route path="/model" element={<ModelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
