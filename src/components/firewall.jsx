// FirewallRules.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";

const FirewallRules = ({ threats }) => {
  if (!threats || threats.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2, color: "#000" }}>
        🔐 No firewall rules yet. Connect your email to detect phishing threats.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 3 }}>
      {threats.map((threat, index) => (
        <Card
          key={index}
          sx={{
            width: 300,
            borderLeft: "5px solid #f44336",
            backgroundColor: "#fff5f5",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" mb={1}>
              <ShieldIcon sx={{ color: "#f44336", mr: 1 }} />
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#000" }}>
                Rule #{index + 1}
              </Typography>
            </Box>
            <Typography variant="body2" gutterBottom sx={{ color: "#000" }}>
              <strong>Sender:</strong> {threat.sender || "Unknown"}
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: "#000" }}>
              <strong>Subject:</strong> {threat.subject || "N/A"}
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ color: "#000" }}>
              <strong>IP Blocked:</strong> {threat.ip || "Unidentified"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, fontStyle: "italic", color: "#000" }}
            >
              🚫 AI-generated firewall rule applied to block phishing attempt.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FirewallRules;
