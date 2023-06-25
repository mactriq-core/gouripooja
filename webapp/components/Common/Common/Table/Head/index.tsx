// React
import React from "react";

// MUI
import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableSortLabel,
} from "@mui/material";

// Lib
import { handleSort } from "../helpers/handle-sort";

// Types & Enums
import { ColumnType } from "@/types/global-types";

const Head = ({
  columns,
  data,
  setData,
  setColumns,
  tableMetaKey,
}: {
  columns: ColumnType[];
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  tableMetaKey: string;
}) => {
  return (
    <TableHead>
      <TableRow>
        {columns?.map((column, i) => {
          if (column?.show) {
            return (
              <TableCell key={i} align="center">
                <div
                  className="flex items-center justify-center pointer select-none"
                  onClick={() =>
                    handleSort(column, data, setData, setColumns, tableMetaKey)
                  }
                >
                  <Typography variant="body2" className="min-w-max">
                    {column?.name}
                  </Typography>
                  {column?.sortable && column?.sortDirection !== "none" && (
                    <TableSortLabel
                      active={true}
                      direction={column?.sortDirection}
                    />
                  )}
                </div>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
};

export default Head;
