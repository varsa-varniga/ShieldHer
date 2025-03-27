import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import {
  SecurityOutlined as SecurityIcon,
  WarningAmberOutlined as WarningIcon,
  CheckCircleOutlined as CheckCircleIcon,
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
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
          },
        },
      },
    },
  },
});

const SecurityDashboard = ({
  userName = "Mayuri Ilango",
  securityScore = 75,
}) => {
  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Potential phishing attempt detected",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "error",
      message: "Unusual login from new device",
      timestamp: "4 hours ago",
    },
  ]);

  const securitySuggestions = [
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
  ];

  const getProgressColor = (score) => {
    if (score < 50) return "#ff6b6b";
    if (score < 75) return "#feca57";
    return "#48dbfb";
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

        <Grid container spacing={3}>
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
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <SecurityIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography variant="h6">Security Score</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                    my: 2,
                  }}
                >
                  <Box sx={{ width: 150, height: 150 }}>
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
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <WarningIcon sx={{ mr: 2, color: "secondary.main" }} />
                  <Typography variant="h6">Recent Alerts</Typography>
                </Box>
                {alerts.map((alert) => (
                  <Box
                    key={alert.id}
                    sx={{
                      backgroundColor:
                        alert.type === "warning"
                          ? "rgba(255, 107, 107, 0.1)"
                          : "rgba(255, 0, 0, 0.1)",
                      borderLeft: `4px solid ${
                        alert.type === "warning" ? "#ff6b6b" : "#ff0000"
                      }`,
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: alert.type === "warning" ? "#ff6b6b" : "#ff0000",
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {alert.message}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {alert.timestamp}
                    </Typography>
                  </Box>
                ))}
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
                            : "error.main",
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
                              : "error.main",
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
                            justifyContent: "flex-end",
                          }}
                        >
                          {suggestion.completed ? (
                            <CheckCircleIcon sx={{ color: "success.main" }} />
                          ) : (
                            <Typography
                              variant="body2"
                              sx={{ color: "error.main" }}
                            >
                              Action Required
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default SecurityDashboard;
