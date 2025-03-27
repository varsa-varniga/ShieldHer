import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress,
} from "@mui/material";

const ThreatScanner = ({ isDarkMode }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const handleScan = () => {
    setIsScanning(true);
    // Simulating a scan process
    setTimeout(() => {
      setIsScanning(false);
      setScanResults({
        status: "Safe",
        threats: 0,
        details: "No potential threats detected in the system.",
      });
    }, 2000);
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#1a2634" : "#f4f6f8",
        color: isDarkMode ? "#ffffff" : "#000000",
        minHeight: "100%",
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        AI Threat Scanner
      </Typography>
      <Card
        sx={{
          backgroundColor: isDarkMode ? "#243447" : "#ffffff",
          color: isDarkMode ? "#ffffff" : "#000000",
          marginTop: 3,
        }}
      >
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter URL or File Path to Scan"
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleScan}
            disabled={isScanning}
          >
            {isScanning ? <CircularProgress size={24} /> : "Start Scan"}
          </Button>

          {scanResults && (
            <Card
              sx={{
                marginTop: 3,
                backgroundColor: isDarkMode ? "#2c3e50" : "#f1f1f1",
              }}
            >
              <CardContent>
                <Typography variant="h6">Scan Results</Typography>
                <Typography>Status: {scanResults.status}</Typography>
                <Typography>Threats Detected: {scanResults.threats}</Typography>
                <Typography>Details: {scanResults.details}</Typography>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatScanner;
