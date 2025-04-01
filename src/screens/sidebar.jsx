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
  Divider,
} from "@mui/material";
import logo from "../assets/logo.png"

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
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop:'10px'}}>
        {isExpanded && (
          <img
            src={logo}
            alt="logo"
            style={{ borderRadius: '6px', margin:'15px' }}
            width={150}
            height={40}
          />
        )}
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          <MenuIcon sx={{ color: "white", fontSize:"60px", padding:2 }} />
        </IconButton>
      </Box>

      <List sx={{ paddingY: 1 }}>
        {navItems.map((item) => (
          <ListItem
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
              cursor: "pointer" // Add cursor pointer to indicate clickable
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