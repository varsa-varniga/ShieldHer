import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Book as BookIcon,
  Help as HelpCircleIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";

const CybersecuritySidebar = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <HomeIcon />, label: "Home", route: "/dashboard" },
    { icon: <SearchIcon />, label: "AI Threat Scanner", route: "/threat-scanner" },
    { icon: <BookIcon />, label: "Cyber Safety Guide", route: "/safety-guide" },
    { icon: <HelpCircleIcon />, label: "Emergency Help", route: "/emergency" },
    { icon: <SettingsIcon />, label: "Settings & Profile", route: "/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isExpanded ? 260 : 80,
        flexShrink: 0,
        overflowX: "hidden",
        transition: "width 0.3s",
        "& .MuiDrawer-paper": {
          width: isExpanded ? 260 : 80,
          boxSizing: "border-box",
          overflowX: "hidden",
          backgroundColor: "#243447",
          color: "#FFFFFF",
          boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
          borderRight: "none",
          paddingTop: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2 }}>
        {isExpanded && (
          <Typography
            variant="h6"
            sx={{ fontFamily: "Rajdhani, sans-serif", fontWeight: "bold", letterSpacing: 2 }}
          >
            CyberShield
          </Typography>
        )}
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <List sx={{ paddingY: 1 }}>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.route}
            selected={location.pathname === item.route}
            onClick={() => navigate(item.route)}
            sx={{
              position: "relative",
              padding: "14px 24px",
              marginBottom: "12px",
              transition: "all 0.3s ease-in-out",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)", transform: "scale(1.05)" },
              "&.Mui-selected": { backgroundColor: "#36A2EB", color: "white", borderRadius: "12px" },
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.route ? "white" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            {isExpanded && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default CybersecuritySidebar;
