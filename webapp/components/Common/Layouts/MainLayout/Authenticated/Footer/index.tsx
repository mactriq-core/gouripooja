// React
import React from "react";

// MUI
import { useMediaQuery, Theme, Box } from "@mui/material";

// Constants
import { FOOTER_HEIGHT, MINI_SIDE_BAR_WIDTH } from "@/constants/globals";

const Footer = () => {
  // Breakpoints States
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <footer
      style={{
        height: FOOTER_HEIGHT,
        marginLeft: isMd ? 0 : MINI_SIDE_BAR_WIDTH,
        display: "flex",
        transition: "all 500ms ease",
      }}
      className="shadow"
    >
      <Box
        sx={{
          px: "1.25rem",
          bgcolor: "background.paper",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: isSm ? "center" : "space-between",
          gap: "1.25rem",
        }}
      >
        <div className="flex items-center gap-[0.625rem]">
          {/* <img src="/logo-rounded.svg" alt="Logo" className="w-[2rem]" /> */}
          <h6 className="font-medium text-overline leading-[1]">
            Mactriq Technologies Pvt Ltd
          </h6>
        </div>
        <p className="sm:hidden">
          &copy; Mactriq Technologies Pvt Ltd {new Date().getFullYear()}. All
          rights reserved.
        </p>
      </Box>
    </footer>
  );
};

export default Footer;
