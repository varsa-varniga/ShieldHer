import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Chip,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import {
  SecurityOutlined as SecurityIcon,
  WarningAmberOutlined as WarningIcon,
  CheckCircleOutlined as CheckCircleIcon,
  SearchOutlined as ScanIcon,
  BuildOutlined as ImproveIcon,
  EmojiEmotionsOutlined as EmpowerIcon,
  ShieldOutlined as ShieldIcon,
  WarningOutlined as ThreatIcon,
  StarOutlined as StarIcon,
  DeleteOutline as DeleteIcon,
  HistoryOutlined as HistoryIcon,
} from "@mui/icons-material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Custom theme configuration
const theme = createTheme({
  palette: {
    background: {
      default: "#1a2634",
      paper: "#253242",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
    primary: {
      main: "#3f7afc",
    },
    secondary: {
      main: "#ff6b6b",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#ff3f34",
    },
    warning: {
      main: "#feca57",
    },
    threatColors: {
      high: {
        main: "#FF4D4D",
        light: "#FFE5E5",
        contrastText: "#fff",
      },
      medium: {
        main: "#FF9F1C",
        light: "#FFF4E5",
        contrastText: "#fff",
      },
      low: {
        main: "#2EC4B6",
        light: "#E5F6F4",
        contrastText: "#fff",
      },
    },
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          padding: "10px 20px",
        },
      },
    },
  },
});

const SecurityDashboard = ({
  userName = "Mayuri Ilango",
  securityScore = 75,
}) => {
  const [securitySuggestions, setSecuritySuggestions] = useState([
    {
      id: 1,
      title: "Two-Factor Authentication",
      description: "Enable 2FA for enhanced account security",
      completed: false,
    },
    {
      id: 2,
      title: "Password Strength",
      description: "Update to a stronger, unique password",
      completed: false,
    },
    {
      id: 3,
      title: "Device Management",
      description: "Review and remove unused connected devices",
      completed: true,
    },
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threats, setThreats] = useState([
    {
      id: 1,
      type: "phishing",
      description:
        "Suspicious email from unknown sender attempting to steal credentials",
      risk: "High",
    },
    {
      id: 2,
      type: "malware",
      description: "Potential malware link detected in recent download",
      risk: "High",
    },
    {
      id: 3,
      type: "network",
      description: "Unauthorized access attempt from unknown IP address",
      risk: "High",
    },
    {
      id: 4,
      type: "password",
      description: "Weak password detected for critical account",
      risk: "Medium",
    },
    {
      id: 5,
      type: "software",
      description: "Outdated security software requires immediate update",
      risk: "Medium",
    },
    {
      id: 6,
      type: "privacy",
      description: "Potential data exposure in recent application",
      risk: "Low",
    },
    {
      id: 7,
      type: "device",
      description: "Unrecognized device connected to network",
      risk: "Medium",
    },
    {
      id: 8,
      type: "encryption",
      description: "Incomplete disk encryption configuration",
      risk: "Low",
    },
  ]);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const toggleSuggestionCompletion = (suggestionId) => {
    setSecuritySuggestions((currentSuggestions) =>
      currentSuggestions.map((suggestion) =>
        suggestion.id === suggestionId
          ? { ...suggestion, completed: !suggestion.completed }
          : suggestion
      )
    );

    setNotification({
      open: true,
      message: "Security suggestion status updated",
      severity: "success",
    });
  };

  const startSecurityScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const simulateScan = setInterval(() => {
      setScanProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(simulateScan);
          setIsScanning(false);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);
  };

  const handleMarkAsSafe = (threatId) => {
    setThreats((prevThreats) =>
      prevThreats.filter((threat) => threat.id !== threatId)
    );

    setNotification({
      open: true,
      message: "Threat marked as safe successfully",
      severity: "success",
    });
  };

  const handleReportThreat = (threat) => {
    // Simulate reporting logic
    setThreats((prevThreats) => prevThreats.filter((t) => t.id !== threat.id));

    setNotification({
      open: true,
      message: `Threat "${threat.description}" reported to security team`,
      severity: "warning",
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High":
        return "error";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "default";
    }
  };

  const getProgressColor = (score) => {
    if (score < 50) return "#ff6b6b";
    if (score < 75) return "#feca57";
    return "#48dbfb";
  };

  const [threatHistory, setThreatHistory] = useState([
    {
      id: 5,
      date: "2024-03-15",
      type: "Phishing Attempt",
      description: "Suspicious email from unknown sender",
      risk: "High",
      action: "Blocked and Reported",
      resolvedBy: "Automated System",
    },
    {
      id: 2,
      date: "2024-03-10",
      type: "Malware Detection",
      description: "Potential malware in downloaded file",
      risk: "High",
      action: "Quarantined and Deleted",
      resolvedBy: "Security Team",
    },
    {
      id: 3,
      date: "2024-03-05",
      type: "Unauthorized Access",
      description: "Login attempt from unknown IP",
      risk: "Medium",
      action: "IP Blocked",
      resolvedBy: "Firewall",
    },
    {
      id: 4,
      date: "2024-02-28",
      type: "Software Vulnerability",
      description: "Outdated security software",
      risk: "Low",
      action: "Auto-Updated",
      resolvedBy: "System Update",
    },
  ]);

  const removeThreatFromHistory = (threatId) => {
    setThreatHistory((prevHistory) =>
      prevHistory.filter((threat) => threat.id !== threatId)
    );

    // Optional: Show a notification
    setNotification({
      open: true,
      message: "Threat history entry removed",
      severity: "info",
    });
  };

  const addThreatToHistory = (newThreat) => {
    setThreatHistory((prevHistory) => [
      {
        ...newThreat,
        id:
          prevHistory.length > 0
            ? Math.max(...prevHistory.map((t) => t.id)) + 1
            : 1,
      },
      ...prevHistory,
    ]);

    // Optional: Show a notification
    setNotification({
      open: true,
      message: "New threat history entry added",
      severity: "success",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100vh",
          p: 4,
          color: "text.primary",
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Welcome, {userName}
        </Typography>

        <Grid container spacing={2}>
          {/* Security Score */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.paper",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 330,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mt: -1 }}>
                  <SecurityIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography variant="h6">Security Score</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <Box sx={{ width: 180, height: 180, mb: 1 }}>
                    <CircularProgressbar
                      value={securityScore}
                      text={`${securityScore}%`}
                      styles={buildStyles({
                        textColor: "white",
                        pathColor: getProgressColor(securityScore),
                        trailColor: "rgba(255,255,255,0.1)",
                        textSize: "24px",
                      })}
                    />
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Your security is {securityScore}% strong
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Alerts */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "background.paper",
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  mt: -1,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, mt: -1 }}
                >
                  <EmpowerIcon sx={{ mr: 2, color: "success.main" }} />
                  <Typography variant="h6">
                    Your Safety, Our Priority
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, color: "text.secondary" }}
                >
                  We're committed to providing you with the most comprehensive
                  and trustworthy security experience. Every feature is designed
                  to give you peace of mind and protect what matters most to
                  you.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "rgba(76, 175, 80, 0.1)",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <StarIcon sx={{ mr: 2, color: "success.main" }} />
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      Your trust is our greatest security measure. We
                      continuously evolve to stay ahead of potential threats.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "rgba(76, 175, 80, 0.1)",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <StarIcon sx={{ mr: 2, color: "success.main" }} />
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      Our promise: relentless dedication to your security in an
                      ever-changing world.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Security Suggestions */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "background.paper" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircleIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography variant="h6">Security Recommendations</Typography>
                </Box>
                <Grid container spacing={2}>
                  {securitySuggestions.map((suggestion) => (
                    <Grid item xs={12} md={4} key={suggestion.id}>
                      <Box
                        sx={{
                          border: "1px solid",
                          borderColor: suggestion.completed
                            ? "success.main"
                            : "primary.main",
                          borderRadius: 2,
                          p: 2,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: suggestion.completed
                              ? "success.main"
                              : "primary.main",
                          }}
                        >
                          {suggestion.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            flexGrow: 1,
                            color: "text.secondary",
                          }}
                        >
                          {suggestion.description}
                        </Typography>
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 1,
                          }}
                        >
                          {suggestion.completed ? (
                            <CheckCircleIcon sx={{ color: "success.main" }} />
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{ color: "primary.main" }}
                            >
                              Action Required
                            </Typography>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            color={suggestion.completed ? "primary" : "success"}
                            onClick={() =>
                              toggleSuggestionCompletion(suggestion.id)
                            }
                          >
                            {suggestion.completed ? "Undo" : "Mark Complete"}
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Real-Time Threat Alerts */}
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "background.paper" }}>
              <CardContent>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      color: "secondary.main",
                    }}
                  >
                    <ThreatIcon sx={{ mr: 2 }} /> Real-Time Threat Alerts
                  </Typography>
                  {isScanning ? (
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: 200, height: 200, mb: 2 }}>
                        <CircularProgressbar
                          value={scanProgress}
                          text={`${scanProgress}%`}
                          styles={buildStyles({
                            textColor: "white",
                            pathColor: "#3f7afc",
                            trailColor: "rgba(255,255,255,0.1)",
                            textSize: "24px",
                          })}
                        />
                      </Box>
                      <Typography variant="h6">
                        Security Scan in Progress
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Analyzing system for potential threats...
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ScanIcon />}
                        onClick={startSecurityScan}
                        sx={{ mt: 2 }}
                      >
                        {isScanning ? "Scanning..." : "Scan for Threats"}
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      {threats.length === 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 4,
                          }}
                        >
                          <CheckCircleIcon
                            sx={{
                              fontSize: 80,
                              color: "success.main",
                              mb: 2,
                            }}
                          />
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            No Active Threats Detected
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: "center" }}
                          >
                            Your system is secure and no immediate threats have
                            been identified.
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ScanIcon />}
                            onClick={startSecurityScan}
                            sx={{ mt: 2 }}
                          >
                            Perform Security Scan
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            maxHeight: "400px",
                            overflowY: "auto",
                            paddingRight: "8px",
                            "&::-webkit-scrollbar": {
                              width: "4px",
                              backgroundColor: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "rgba(255,255,255,0.2)",
                              borderRadius: "4px",
                            },
                          }}
                        >
                          {threats.map((threat) => (
                            <Box
                              key={threat.id}
                              sx={{
                                backgroundColor: "background.paper",
                                border: `1px solid ${
                                  theme.palette.threatColors[
                                    threat.risk.toLowerCase()
                                  ].main
                                }`,
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    fontWeight: 600,
                                    mb: 1,
                                    color:
                                      theme.palette.threatColors[
                                        threat.risk.toLowerCase()
                                      ].main,
                                  }}
                                >
                                  {threat.description}
                                </Typography>
                                <Chip
                                  label={`${threat.risk} Risk`}
                                  color={
                                    getRiskColor(threat.risk).split(".")[1]
                                  }
                                  size="small"
                                />
                              </Box>
                              <Box>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  sx={{ mr: 1 }}
                                  onClick={() => handleMarkAsSafe(threat.id)}
                                >
                                  Mark as Safe
                                </Button>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  onClick={() => handleReportThreat(threat)}
                                >
                                  Report
                                </Button>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      )}
                      <Snackbar
                        open={notification.open}
                        autoHideDuration={6000}
                        onClose={handleCloseNotification}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <Alert
                          onClose={handleCloseNotification}
                          severity={notification.severity}
                          sx={{ width: "100%" }}
                        >
                          {notification.message}
                        </Alert>
                      </Snackbar>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "background.paper" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HistoryIcon sx={{ mr: 2, color: "primary.main" }} />
                    <Typography variant="h6">
                      Threat Resolution History
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      addThreatToHistory({
                        date: new Date().toISOString().split("T")[0],
                        type: "Test Threat",
                        description: "Sample threat for demonstration",
                        risk: "Low",
                        action: "Simulated",
                        resolvedBy: "System Test",
                      })
                    }
                  >
                    Add Sample Threat
                  </Button>
                </Box>
                <TableContainer
                  component={Paper}
                  sx={{
                    backgroundColor: "background.default",
                    boxShadow: "none",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                          S.No
                        </TableCell>
                        <TableCell
                          sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                          Threat Type
                        </TableCell>
                        <TableCell
                          sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                          Description
                        </TableCell>
                        <TableCell
                          sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                          Risk
                        </TableCell>
                        <TableCell
                          sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                          Action Taken
                        </TableCell>
                        <TableCell
                          sx={{ color: "text.primary", fontWeight: "bold" }}
                        >
                          Resolved By
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {threatHistory.map((threat, index) => (
                        <TableRow
                          key={threat.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            backgroundColor: theme.palette.background.paper,
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.08)",
                            },
                          }}
                        >
                          <TableCell sx={{ color: "text.secondary" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell sx={{ color: "text.secondary" }}>
                            {threat.date}
                          </TableCell>
                          <TableCell sx={{ color: "text.secondary" }}>
                            {threat.type}
                          </TableCell>
                          <TableCell sx={{ color: "text.secondary" }}>
                            {threat.description}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${threat.risk} Risk`}
                              color={getRiskColor(threat.risk).split(".")[1]}
                              size="small"
                            />
                          </TableCell>
                          <TableCell sx={{ color: "text.secondary" }}>
                            {threat.action}
                          </TableCell>
                          <TableCell sx={{ color: "text.secondary" }}>
                            {threat.resolvedBy}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="secondary"
                              size="small"
                              onClick={() => removeThreatFromHistory(threat.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SecurityDashboard;
