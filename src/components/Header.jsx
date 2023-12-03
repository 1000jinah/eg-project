import { Box } from "@mui/material";
import React from "react";
import Logo from "image/logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
const Header = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img src={Logo} style={{ width: "auto", height: 50 }} alt="Logo" />
        <Box
          sx={{ width: 150, display: "flex", justifyContent: "space-between" }}
        >
          <NotificationsIcon />
          <SettingsIcon />
          <PersonIcon />
        </Box>
      </Box>
    </div>
  );
};

export default Header;
