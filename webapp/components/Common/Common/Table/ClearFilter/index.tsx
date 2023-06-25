// React
import React from "react";

// Lib
import { setLocalStorage } from "@/lib/local-storage";

// MUI
import { Tooltip, IconButton } from "@mui/material";

// Icons
import { CloseOutlined } from "@mui/icons-material";

// Toast
import toast from "react-hot-toast";

// Types & Enums
import { TableMetaType, ColumnType } from "@/types/global-types";

const ClearFilter = ({
  initialData,
  setData,
  tableMetaKey,
  tableMeta,
  setColumns,
  setSearch,
  setPage,
  setRowsPerPage,
}: {
  initialData: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  tableMetaKey: string;
  tableMeta: TableMetaType;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // Handle Clear Filter
  const handleClearFilter = () => {
    setLocalStorage(tableMetaKey, tableMeta);
    setColumns(tableMeta?.columns);
    setSearch(tableMeta?.lastSearch);
    setPage(tableMeta?.lastPage);
    setRowsPerPage(tableMeta?.lastRowsPerPage);
    setData(initialData);
    toast.success("Filter cleared");
  };

  return (
    <Tooltip title="Clear Filter">
      <IconButton onClick={handleClearFilter}>
        <CloseOutlined />
      </IconButton>
    </Tooltip>
  );
};

export default ClearFilter;
