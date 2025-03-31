import {
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import LandingPage from "./src/components/landingPage";
import CybersecuritySidebar from "./src/screens/sidebar";
import Dashboard from "./src/components/dashboard";
import ThreatScanner from "./src/components/threatscanner";
import CyberSafetyGuide from "./src/components/cybersecurity";
import EmergencyHelp from "./src/components/emergency";
import Settings from "./src/components/settings";
import Header from "./src/screens/header";
import Login from "./src/components/login";
import SignUp from "./src/components/signUp";

function Layout({ isExpanded, setIsExpanded }) {
    const location = useLocation();
    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#1a2634",
                color: "#ffffff",
            }}
        >
             {location.pathname === "/" && (
                <Header/>
            )}
            {location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/signup" && (
                <CybersecuritySidebar
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                />
            )}
           
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
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/threat-scanner" element={<ThreatScanner />} />
                    <Route path="/safety-guide" element={<CyberSafetyGuide />} />
                    <Route path="/emergency" element={<EmergencyHelp />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default Layout;