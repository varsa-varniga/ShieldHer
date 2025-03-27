import React from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CyberSafetyGuide = ({ isDarkMode }) => {
  const safetyTips = [
    "Use strong, unique passwords for each account",
    "Enable two-factor authentication",
    "Be cautious of phishing emails",
    "Keep software and systems updated",
    "Use a reliable antivirus software",
    "Be careful when using public Wi-Fi",
    "Regularly backup your data",
  ];

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
        Cyber Safety Guide
      </Typography>
      <Card
        sx={{
          backgroundColor: isDarkMode ? "#243447" : "#ffffff",
          color: isDarkMode ? "#ffffff" : "#000000",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Top Cybersecurity Tips
          </Typography>
          <List>
            {safetyTips.map((tip, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${index + 1}. ${tip}`}
                  primaryTypographyProps={{
                    color: isDarkMode ? "white" : "black",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default CyberSafetyGuide;
    