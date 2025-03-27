import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Grid,
} from "@mui/material";

const Settings = ({ isDarkMode }) => {
  const [notifications, setNotifications] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);

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
        Settings & Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: isDarkMode ? "#243447" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            <CardContent>
              <Typography variant="h6">Notification Settings</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    color="primary"
                  />
                }
                label="Enable Notifications"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: isDarkMode ? "#243447" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          >
            <CardContent>
              <Typography variant="h6">System Updates</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={autoUpdates}
                    onChange={() => setAutoUpdates(!autoUpdates)}
                    color="primary"
                  />
                }
                label="Automatic Updates"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
