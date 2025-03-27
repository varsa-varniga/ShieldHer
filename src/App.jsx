import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CybersecuritySidebar from "./screens/sidebar";
import Dashboard from "./components/dashboard";
import ThreatScanner from "./components/threatscanner";
import CyberSafetyGuide from "./components/cybersecurity";
import EmergencyHelp from "./components/emergency";
import Settings from "./components/settings";
import { CssBaseline } from "@mui/material";

function App() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Router>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#1a2634",
          color: "#ffffff",
        }}
      >
        <CybersecuritySidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
        <main
          style={{
            flexGrow: 1,
            padding: "20px",
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: "#1a2634",
            transition: "background-color 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/threat-scanner" element={<ThreatScanner />} />
            <Route path="/safety-guide" element={<CyberSafetyGuide />} />
            <Route path="/emergency" element={<EmergencyHelp />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
