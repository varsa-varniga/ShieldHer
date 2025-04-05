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
    {
      icon: <SearchIcon />,
      label: "AI Threat Scanner",
      route: "/threat-scanner",
    },
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
        transition: "width 0.3s ease",
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        {isExpanded && (
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Rajdhani, sans-serif",
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            CyberShield
          </Typography>
        )}
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <List sx={{ paddingY: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.route;
          return (
            <ListItem
              button
              key={item.route}
              selected={isActive}
              onClick={() => navigate(item.route)}
              sx={{
                position: "relative",
                padding: "14px 24px",
                marginBottom: "12px",
                marginLeft: isExpanded ? "12px" : "4px",
                marginRight: isExpanded ? "12px" : "4px",
                transition: "all 0.3s ease-in-out",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "scale(1.05)",
                },
                "&.Mui-selected": {
                  backgroundColor: "#36A2EB",
                  color: "white",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(54, 162, 235, 0.3)",
                  fontWeight: "bold",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "25%",
                    height: "50%",
                    width: "4px",
                    backgroundColor: "#ffffff",
                    borderRadius: "0 4px 4px 0",
                    display: isExpanded ? "block" : "none",
                  },
                },
                "& .MuiListItemIcon-root": {
                  transition: "transform 0.2s ease",
                },
                "&.Mui-selected .MuiListItemIcon-root": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "white" : "inherit",
                  minWidth: isExpanded ? 56 : 24,
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isExpanded && (
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: isActive ? "bold" : "normal",
                    },
                  }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default CybersecuritySidebar;
