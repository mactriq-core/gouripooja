// React
import React from "react";

// MUI
import { TableRow, TableCell, Typography } from "@mui/material";

const EmptyState = ({
  rowLength,
  colLength,
  text = "No Data Found",
}: {
  rowLength: number;
  colLength: number;
  text?: string;
}) => {
  return (
    <>
      {rowLength === 0 && (
        <TableRow>
          <TableCell colSpan={colLength} align="center">
            <Typography variant="body2" align="center">
              {text}
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default EmptyState;
