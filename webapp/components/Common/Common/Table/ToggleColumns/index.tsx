// React
import React, { useState } from "react";

// Lib
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage";

// MUI
import { Menu, Tooltip, Switch, Typography, IconButton } from "@mui/material";

// Icons
import { SettingsOutlined } from "@mui/icons-material";

// Types & Enums
import { ColumnType } from "@/types/global-types";

const ToggleColumns = ({
  tableMetaKey,
  columns,
  setColumns,
}: {
  tableMetaKey: string;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}) => {
  // States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handlers
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggle = (columnKey: string) => {
    const newColumns = columns?.map((col) => {
      if (col?.key === columnKey) return { ...col, show: !col?.show };
      else return col;
    });
    setColumns(newColumns);
    setLocalStorage(tableMetaKey, {
      ...getLocalStorage(tableMetaKey),
      columns: newColumns,
    });
  };

  return (
    <>
      <Tooltip title="Toggle Columns">
        <IconButton onClick={handleOpen}>
          <SettingsOutlined />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {columns?.map((column, i) => (
          <label
            key={i}
            className="flex items-center gap-[4px] px-[0.625rem] w-[11.25rem] pointer"
            htmlFor={column?.name}
          >
            <Switch
              color="primary"
              size="small"
              checked={column?.show}
              id={column?.name}
              onChange={() => handleToggle(column?.key)}
            />
            <Typography variant="body2">{column?.name}</Typography>
          </label>
        ))}
      </Menu>
    </>
  );
};

export default ToggleColumns;
