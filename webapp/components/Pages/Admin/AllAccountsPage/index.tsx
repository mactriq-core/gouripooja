// React
import React, { useEffect } from "react";

// MUI
import { Box, Typography } from "@mui/material";

// Components
// import AccessManager from "@/components/Common/AccessManager";
import Header from "./Components/Header";
import ProgramListTable from "./Components/AllAccountsListTable";

// Redux
// import { useDispatch, useSelector } from "react-redux";
// import { getCbpList } from "@/store/cbp/cbp-actions";

// Types & Enums
// import { CourseBluePrintType } from "@/types/global-types";

const AllAccountsPage = () => {
  // Redux States
  //   const selectedInstituteId = useSelector(
  //     (state: any) => state?.institutes?.selectedInstituteId
  //   );
  //   const cbpList: CourseBluePrintType[] = useSelector(
  //     (state: any) => state?.cbp?.cbpList
  //   );

  // Redux Dispatch Functions
  //   const dispatch = useDispatch();

  // Effects
  //   useEffect(() => {
  //     if (selectedInstituteId) {
  //       dispatch(getCbpList(selectedInstituteId, true) as any);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [selectedInstituteId]);

  return (
    // <AccessManager keyName="cbpList" padding shadow round bgColor>
    //   {selectedInstituteId && (
    <>
      <Box className="flex-1 flex flex-col gap-[1.25rem]">
        <Header />
        <ProgramListTable />
      </Box>
    </>

    //   {!selectedInstituteId && (
    //     <Box className="flex-1 flex items-center justify-center text-center">
    //       <Typography variant="button" sx={{ fontWeight: 600 }}>
    //         Select an institute to view content
    //       </Typography>
    //     </Box>
    //   )}
    // </AccessManager>
  );
};

export default AllAccountsPage;
