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
        Master Category Setup
      </Typography>
      <Typography variant="body2">
        Set the product categories available in your shop.
      </Typography>
    </Box>
  );
};

export default Header;
