import { Box } from "@mui/material";
import React from "react";
import Logo from "image/logo_algolab.svg";
import Alert from "image/icon_alert.svg";
import Setting from "image/icon_setting.svg";
import Mypage from "image/icon_mypage.svg";
const Header = () => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#fef8f3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px:3,
          py:1.5,
          borderBottom:"1px solid #e6e4e2"
        }}
      >
        <img src={Logo} style={{ width: "auto", height: 18 }} alt="Logo" />
        <Box
          sx={{ width: 120, display: "flex", justifyContent: "space-between" }}
        >
          <img src={Alert} style={{ width: "auto", height: 16 }} alt="Logo" />
          <img src={Setting} style={{ width: "auto", height: 16 }} alt="Logo" />
          <img src={Mypage} style={{ width: "auto", height: 16 }} alt="Logo" />
        </Box>
      </Box>
    </div>
  );
};

export default Header;
