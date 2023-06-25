// React
import React from "react";

// MUI
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      className="flex flex-col p-[1.25rem] round shadow"
      sx={{ backgroundColor: "background.paper" }}
    >
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Packaging Types Setup
      </Typography>
      <Typography variant="body2">
        Set the product packaging available in your shop like boxes, plastic
        bag, etc.
      </Typography>
    </Box>
  );
};

export default Header;
