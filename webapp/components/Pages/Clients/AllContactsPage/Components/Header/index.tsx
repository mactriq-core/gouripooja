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
        All Contacts
      </Typography>
      <Typography variant="body2">
        A contact represents any user details. Contacts can exist without a
        company.
      </Typography>
    </Box>
  );
};

export default Header;
