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
import CybersecurityQuiz from "./components/CyberSecurityQuiz.jsx";
import CitizenManualPage from "./components/Guides.jsx";
import { CssBaseline } from "@mui/material";
import CyberSafetyTips from "./components/CyberSafetyTips.jsx";

function App() {
  const [isExpanded, setIsExpanded] = useState(true);

  // ✅ Moved useState inside App function
  const [manuals] = useState([
    [
      { title: "Citizen Manual Report CPRGR complaints", link: "https://cybercrime.gov.in/UploadMedia/MHA-CitizenManualReportCPRGRcomplaints-v10.pdf", isNew: false },
      { title: "Citizen Manual REPORT CYBER CRIME", link: "https://cybercrime.gov.in/UploadMedia/MHA-CitizenManualReportOtherCyberCrime-v10.pdf", isNew: true },
      { title: "Citizen Manual Financial Cyber Frauds Reporting and Management System", link: "https://cybercrime.gov.in/UploadMedia/instructions_citizenreportingcyberfrauds.pdf", isNew: false },
    ],
    [
      { title: "Manual 1B", link: "#", isNew: true },
      { title: "Manual 2B", link: "#", isNew: false },
      { title: "Manual 3B", link: "#", isNew: true },
    ],
    [
      { title: "Manual 1C", link: "#", isNew: false },
      { title: "Manual 2C", link: "#", isNew: true },
      { title: "Manual 3C", link: "#", isNew: false },
    ],
  ]);

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
            <Route path="/cyberquiz" element={<CybersecurityQuiz />} />
            <Route path="/cyber-safety-tips" element={<CyberSafetyTips />} />
            <Route path="/cyber-guide" 
  element={<CitizenManualPage title="Cyber Guide Manuals" manuals={manuals[0]} />} 
/>
<Route path="/cyber-awareness" 
  element={<CitizenManualPage title="Cyber Awareness Manuals" manuals={manuals[1]} />} 
/>
<Route path="/cyber-dailydigest" 
  element={<CitizenManualPage title="Cyber Daily Digest Manuals" manuals={manuals[2]} />} 
/>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
