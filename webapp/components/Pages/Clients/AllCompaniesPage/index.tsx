// React
import React, { useEffect } from "react";

// MUI
import { Box, Typography } from "@mui/material";

// Components
// import AccessManager from "@/components/Common/AccessManager";
import Header from "./Components/Header";
import CompaniesListTable from "./Components/AllCompaniesListTable";

const AllCompaniesPage = () => {
  return (
    <>
      <Box className="flex-1 flex flex-col gap-[1.25rem]">
        <Header />
        <CompaniesListTable />
      </Box>
    </>
  );
};

export default AllCompaniesPage;
