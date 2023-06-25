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
import { CategoryType, ColumnType, TableMetaType } from "@/types/global-types";

// Initial States
const Columns: ColumnType[] = [
  {
    name: "Category Name",
    key: "CategoryName",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "string",
  },
  {
    name: "Category Code",
    key: "CategoryCode",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "string",
  },
  {
    name: "Category Short Name",
    key: "CategoryShortName",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "string",
  },
  {
    name: "Status",
    key: "Status",
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
const TableMetaKey = "@Catalog-Settings-CategoryListTable";
const TableMeta: TableMetaType = {
  columns: Columns,
  lastSortedColumn: null,
  lastSearch: "",
  lastPage: 0,
  lastRowsPerPage: 5,
};

const CategoryListTable = ({
  categoryList,
  selectedCategory,
  setSelectedCategory,
  openCreateUpdateCategoryModal,
  openLockCategoryModal,
  openUnlockCategoryModal,
}: {
  categoryList: CategoryType[];
  selectedCategory: CategoryType | null;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryType | null>
  >;
  openCreateUpdateCategoryModal: () => void;
  openLockCategoryModal: () => void;
  openUnlockCategoryModal: () => void;
}) => {
  // States
  const [data, setData] = useState<CategoryType[]>([]);

  const [columns, setColumns] = useState<ColumnType[]>(TableMeta?.columns);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Memoize Data Filter by Search
  const filteredData = useMemo(() => {
    return data?.filter((row) => {
      const { CategoryName, CategoryCode, CategoryShortName, Status } = row;
      const searchValue = search?.toLowerCase();
      return (
        CategoryName?.toLowerCase()?.includes(searchValue) ||
        CategoryCode?.toLowerCase()?.includes(searchValue) ||
        CategoryShortName?.toLowerCase()?.includes(searchValue) ||
        Status?.toLowerCase()?.includes(searchValue)
      );
    });
  }, [data, search]);

  // Initial Load
  useEffect(() => {
    if (categoryList?.length > 0) {
      updateState(
        categoryList,
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
  }, [categoryList]);

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
            initialData={categoryList}
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
            setSelectedCategory(null);
            openCreateUpdateCategoryModal();
          }}
        >
          Create Category
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
                const {
                  CategoryName,
                  CategoryCode,
                  CategoryShortName,
                  Status,
                } = row;
                return (
                  <TableRow key={i}>
                    {columns?.map((column, i) => {
                      if (column.show) {
                        if (column.name === "Category Name") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" className="min-w-max">
                                {CategoryName}
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (column.name === "Category Code") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" className="min-w-max">
                                {CategoryCode}
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (column.name === "Category Short Name") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" className="min-w-max">
                                {CategoryShortName}
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (column.name === "Status") {
                          return (
                            <TableCell key={i} align="center">
                              <Chip
                                label={
                                  Status === "UNLOCKED" ? "Unlocked" : "Locked"
                                }
                                color={
                                  Status === "UNLOCKED" ? "success" : "error"
                                }
                                size="small"
                                variant="outlined"
                              />
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
                                  setSelectedCategory(row);
                                }}
                              >
                                <MoreVert />
                              </IconButton>
                              <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                open={
                                  selectedCategory?.CategoryName ===
                                  CategoryName
                                }
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
                                  setSelectedCategory(null);
                                }}
                              >
                                <MenuItem
                                  sx={{ color: "text.secondary" }}
                                  onClick={openCreateUpdateCategoryModal}
                                >
                                  <ModeEditOutlineOutlined className="mr-[0.625rem]" />
                                  Edit Category
                                </MenuItem>
                                <MenuItem
                                  sx={{ color: "text.secondary" }}
                                  onClick={openLockCategoryModal}
                                >
                                  <LockOutline className="mr-[0.625rem]" />
                                  Lock Category
                                </MenuItem>
                                <MenuItem
                                  sx={{ color: "text.secondary" }}
                                  onClick={openUnlockCategoryModal}
                                >
                                  <LockOpen className="mr-[0.625rem]" />
                                  Unlock Category
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
              text="No Department Found"
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

export default CategoryListTable;
