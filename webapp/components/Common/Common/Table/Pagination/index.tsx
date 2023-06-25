// React
import React from "react";

// MUI
import { Box, TablePagination } from "@mui/material";

// Lib
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage";

const Pagination = ({
  tableMetaKey,
  filteredData,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: {
  tableMetaKey: string;
  filteredData: any[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Box className="flex items-center justify-end sm:justify-center">
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 40]}
        component="div"
        count={filteredData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => {
          setPage(newPage);
          setLocalStorage(tableMetaKey, {
            ...getLocalStorage(tableMetaKey),
            lastPage: newPage,
          });
        }}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event?.target?.value, 10));
          setPage(0);
          setLocalStorage(tableMetaKey, {
            ...getLocalStorage(tableMetaKey),
            lastRowsPerPage: parseInt(event?.target?.value, 10),
            lastPage: 0,
          });
        }}
      />
    </Box>
  );
};

export default Pagination;
