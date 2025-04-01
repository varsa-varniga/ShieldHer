import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Book as BookIcon,
  Help as HelpCircleIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  AccountCircle as AccountIcon,
  Email as EmailIcon,
  Logout as LogoutIcon
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
  Avatar,
} from "@mui/material";
import logo from "../assets/logo.png";

const CybersecuritySidebar = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { name, username, email, picture } = user;

  const navItems = [
    { icon: <HomeIcon />, label: "Home", route: "/dashboard" },
    { icon: <SearchIcon />, label: "AI Threat Scanner", route: "/threat-scanner" },
    { icon: <BookIcon />, label: "Cyber Safety Guide", route: "/safety-guide" },
    { icon: <HelpCircleIcon />, label: "Emergency Help", route: "/emergency" },
    { icon: <SettingsIcon />, label: "Settings & Profile", route: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const getAvatarContent = () => {
    if (picture) return null; // Will use image src if picture exists
    const displayName = username || name;
    return displayName ? displayName.charAt(0).toUpperCase() : "G";
  };

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: '10px' }}>
          {isExpanded && (
            <img
              src={logo}
              alt="logo"
              style={{ borderRadius: '6px', margin: '15px' }}
              width={150}
              height={40}
            />
          )}
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            <MenuIcon sx={{ color: "white", fontSize: "60px", padding: 2 }} />
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
                cursor: "pointer"
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.route ? "white" : "inherit" }}>
                {item.icon}
              </ListItemIcon>
              {isExpanded && <ListItemText primary={item.label} />}
            </ListItem>
          ))}
        </List>
      </Box>

{/* User Profile Footer with Logout */}
<Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
        <List>
          <ListItem 
            onClick={handleLogout}
            sx={{
              padding: "14px 24px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)"
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{color:'white'}}/>
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Logout" />}
          </ListItem>
        </List>

      {/* User Profile Footer */}
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <ListItem sx={{ px: 0 }}>
          <ListItemIcon>
          {picture ? (
                <Avatar src={picture} alt={name} sx={{ width: 40, height: 40 }} />
              ) : (
                <Avatar sx={{ 
                  width: 40, 
                  height: 40,
                  bgcolor: '#36A2EB', // Custom background color
                  color: 'white'      // White text for better contrast
                }}>
                  {getAvatarContent()}
                </Avatar>
              )}
          </ListItemIcon>
          {isExpanded && (
            <Box sx={{ ml: 1, overflow: "hidden" }}>
              <Typography variant="subtitle1" noWrap>
                {username || name || "Guest User"}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ fontSize: 16, mr: 1 }} />
                <Typography variant="caption" noWrap>
                  {email || "No email provided"}
                </Typography>
              </Box>
            </Box>
          )}
        </ListItem>
      </Box>
      </Box>
    </Drawer>
  );
};

export default CybersecuritySidebar;