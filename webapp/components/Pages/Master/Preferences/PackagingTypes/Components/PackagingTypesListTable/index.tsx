// React
import React, { useState, useMemo, useEffect } from "react";

// Lib
import { updateState } from "@/components/Common/Common/Table/helpers/update-state";

// MUI
import {
  Box,
  Button,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Tooltip,
} from "@mui/material";

// Components
import ToggleColumns from "@/components/Common/Common/Table/ToggleColumns";
import ClearFilter from "@/components/Common/Common/Table/ClearFilter";
import Search from "@/components/Common/Common/Table/Search";
import Pagination from "@/components/Common/Common/Table/Pagination";
import Head from "@/components/Common/Common/Table//Head";
import EmptyState from "@/components/Common/Common/Table/EmptyState";

// Icons
import {
  MoreVert,
  Add,
  InfoOutlined,
  LockOpen,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import { LockOutline } from "mdi-material-ui";

// Types & Enums
import { PackagingType, ColumnType, TableMetaType } from "@/types/global-types";
import PackagingTypePage from "../..";

// Initial States
const Columns: ColumnType[] = [
  {
    name: "Packaging Name",
    key: "Name",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "string",
  },
  {
    name: "Rate",
    key: "Rate",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "string",
  },
  {
    name: "Actions",
    key: "actions",
    show: true,
    sortable: false,
    sortDirection: "none",
    sortType: "none",
  },
];
const TableMetaKey = "@Master-Preferences-PackagingTypesTable";
const TableMeta: TableMetaType = {
  columns: Columns,
  lastSortedColumn: null,
  lastSearch: "",
  lastPage: 0,
  lastRowsPerPage: 5,
};

const PackagingTypesListTable = ({
  packagingTypeList,
  selectedPackagingType,
  setSelectedPackagingType,
  openCreateUpdatePackagingTypeModal,
  openLockPackagingTypeModal,
  openUnlockPackagingTypeModal,
}: {
  packagingTypeList: PackagingType[];
  selectedPackagingType: PackagingType | null;
  setSelectedPackagingType: React.Dispatch<
    React.SetStateAction<PackagingType | null>
  >;
  openCreateUpdatePackagingTypeModal: () => void;
  openLockPackagingTypeModal: () => void;
  openUnlockPackagingTypeModal: () => void;
}) => {
  // States
  const [data, setData] = useState<PackagingType[]>([]);

  const [columns, setColumns] = useState<ColumnType[]>(TableMeta?.columns);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Memoize Data Filter by Search
  const filteredData = useMemo(() => {
    return data?.filter((row) => {
      const { Name, Rate } = row;
      const searchValue = search?.toLowerCase();
      return Name?.toLowerCase()?.includes(searchValue);
    });
  }, [data, search]);

  // Initial Load
  useEffect(() => {
    if (packagingTypeList?.length > 0) {
      updateState(
        packagingTypeList,
        setData,
        setColumns,
        setSearch,
        setPage,
        setRowsPerPage,
        TableMeta,
        TableMetaKey
      );
    } else {
      setData([]);
    }
  }, [packagingTypeList]);

  return (
    <Box
      className="flex-1 flex flex-col gap-[1.25rem] p-[1.25rem] round shadow"
      sx={{ backgroundColor: "background.paper" }}
    >
      <Box className="flex sm:flex-col-reverse items-center sm:items-start justify-between gap-[1.25rem]">
        <div className="sm:w-full flex items-center gap-[0.625rem]">
          <Search
            tableMetaKey={TableMetaKey}
            search={search}
            setSearch={setSearch}
          />
          <ToggleColumns
            tableMetaKey={TableMetaKey}
            columns={columns}
            setColumns={setColumns}
          />
          <ClearFilter
            initialData={packagingTypeList}
            setData={setData}
            tableMetaKey={TableMetaKey}
            tableMeta={TableMeta}
            setColumns={setColumns}
            setSearch={setSearch}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => {
            setSelectedPackagingType(null);
            openCreateUpdatePackagingTypeModal();
          }}
        >
          Create Packaging Type
        </Button>
      </Box>
      <TableContainer className="scrollbar">
        <Table stickyHeader>
          <Head
            columns={columns}
            data={data}
            setData={setData}
            setColumns={setColumns}
            tableMetaKey={TableMetaKey}
          />
          <TableBody>
            {filteredData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, i) => {
                const { Name, Rate } = row;
                return (
                  <TableRow key={i}>
                    {columns?.map((column, i) => {
                      if (column.show) {
                        if (column.name === "Packaging Name") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" className="min-w-max">
                                {Name}
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (column.name === "Rate") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" className="min-w-max">
                                {Rate}
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (column.name === "Actions") {
                          return (
                            <TableCell key={i} align="center">
                              <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => {
                                  setAnchorEl(e.currentTarget);
                                  setSelectedPackagingType(row);
                                }}
                              >
                                <MoreVert />
                              </IconButton>
                              <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                open={selectedPackagingType?.Name === Name}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  horizontal: "center",
                                  vertical: "top",
                                }}
                                onClose={() => {
                                  setAnchorEl(null);
                                  setSelectedPackagingType(null);
                                }}
                              >
                                <MenuItem
                                  sx={{ color: "text.secondary" }}
                                  onClick={openCreateUpdatePackagingTypeModal}
                                >
                                  <ModeEditOutlineOutlined className="mr-[0.625rem]" />
                                  Edit Packaging Type
                                </MenuItem>
                                <MenuItem
                                  sx={{ color: "text.secondary" }}
                                  onClick={openLockPackagingTypeModal}
                                >
                                  <LockOutline className="mr-[0.625rem]" />
                                  Lock Packaging Type
                                </MenuItem>
                                <MenuItem
                                  sx={{ color: "text.secondary" }}
                                  onClick={openUnlockPackagingTypeModal}
                                >
                                  <LockOpen className="mr-[0.625rem]" />
                                  Unlock Packaging Type
                                </MenuItem>
                              </Menu>
                            </TableCell>
                          );
                        }
                      }
                    })}
                  </TableRow>
                );
              })}
            <EmptyState
              rowLength={filteredData?.length}
              colLength={columns?.length}
              text="No Packaging Type Found"
            />
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="mt-auto">
        <Pagination
          tableMetaKey={TableMetaKey}
          filteredData={filteredData}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default PackagingTypesListTable;
