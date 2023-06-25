// React
import React, { useState, useMemo, useEffect } from "react";

// Next
import Link from "next/link";

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
  Paper,
  TableHead,
  TablePagination,
  Typography,
  TableContainer,
} from "@mui/material";

import EmptyState from "@/components/Common/Common/Table/EmptyState";
import Head from "@/components/Common/Common/Table/Head";
import Pagination from "@/components/Common/Common/Table/Pagination";

import {
  AccountBluePrintType,
  ColumnType,
  TableMetaType,
} from "@/types/global-types";

// Table Support
import Search from "@/components/Common/Common/Table/Search";
import ClearFilter from "@/components/Common/Common/Table/ClearFilter";
import ToggleColumns from "@/components/Common/Common/Table/ToggleColumns";

// Icons
import { Add } from "@mui/icons-material";
import { toast } from "react-hot-toast";

// Initial States
const Columns: ColumnType[] = [
  {
    name: "Company Name",
    key: "CompanyName",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "string",
  },
  {
    name: "Company Type",
    key: "AccountType",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "string",
  },
  {
    name: "Owner Name",
    key: "Name",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "string",
  },
  {
    name: "Active Since",
    key: "createdAt",
    show: true,
    sortable: true,
    sortDirection: "none",
    sortType: "none",
  },
];

const TableMetaKey = "@Client-Companies-AllCompaniesTable";
const TableMeta: TableMetaType = {
  columns: Columns,
  lastSortedColumn: null,
  lastSearch: "",
  lastPage: 0,
  lastRowsPerPage: 5,
};

const mockData = [
  {
    CompanyName: "Test Company 01",
    AccountType: "Retail",
    Name: "Test Company A",
    createdAt: "20 June 2023",
  },
  {
    CompanyName: "Test Company 02",
    AccountType: "Export",
    Name: "Test Company B",
    createdAt: "01 July 2023",
  },
];

const CompaniesListTable = () => {
  // States
  const [data, setData] = useState<AccountBluePrintType[]>([]);

  const [columns, setColumns] = useState<ColumnType[]>(TableMeta?.columns);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // TO DO
  // Memoize Data Filter By Search
  const filteredData = mockData;

  // Initial Load
  useEffect(() => {
    if (filteredData?.length > 0) {
      updateState(
        filteredData,
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
  }, [filteredData]);

  return (
    <Box
      className="flex-1 flex flex-col gap-[1.25rem] p-[1.25rem] round shadow"
      sx={{ backgroundColor: "#fcfcfc" }}
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
            initialData={mockData}
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
            toast.success("Button Clicked : Create Company ");
          }}
        >
          Create Company
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
                const { CompanyName, AccountType, Name, createdAt } = row;
                return (
                  <TableRow key={i}>
                    {columns?.map((column, i) => {
                      if (column.show) {
                        if (column.name === "Company Name") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" align="center">
                                {CompanyName}
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (column.name === "Company Type") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" className="min-w-max">
                                {AccountType}
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (column.name === "Owner Name") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" className="min-w-max">
                                {Name}
                              </Typography>
                            </TableCell>
                          );
                        }
                        if (column.name === "Active Since") {
                          return (
                            <TableCell key={i} align="center">
                              <Typography variant="body2" className="min-w-max">
                                {createdAt}
                              </Typography>
                            </TableCell>
                          );
                        }
                      }
                    })}
                  </TableRow>
                );
              })}
            <EmptyState
              text="No Companies Found"
              colLength={columns?.length}
              rowLength={filteredData?.length}
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

export default CompaniesListTable;
