// React
import React from "react";

// Types & Enums
import { ColumnType } from "@/types/global-types";

// Lib
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage";

// Toast
import { toast } from "react-hot-toast";

// Comparators
const stringComparator = (a: any, b: any) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
const numberComparator = (a: any, b: any) => {
  return a - b;
};
const dateComparator = (a: any, b: any) => {
  return new Date(a).getTime() - new Date(b).getTime();
};

// Handle Sort
export const handleSort = (
  column: ColumnType,
  data: any[],
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>,
  tableMetaKey: string
) => {
  const { key, sortDirection, sortType, sortable } = column;
  if (sortable) {
    const newData = [...data];
    const newColumns: ColumnType[] = getLocalStorage(
      tableMetaKey
    )?.columns?.map((col: ColumnType) => {
      if (col?.key === key) {
        const newSortDirection =
          sortDirection === "none"
            ? "asc"
            : sortDirection === "asc"
            ? "desc"
            : "none";
        return { ...col, sortDirection: newSortDirection };
      } else return { ...col, sortDirection: "none" };
    });
    if (sortDirection === "none") {
      switch (sortType) {
        case "string":
          newData?.sort((a, b) => stringComparator(a[key], b[key]));
          break;
        case "number":
          newData?.sort((a, b) => numberComparator(a[key], b[key]));
          break;
        case "date":
          newData?.sort((a, b) => dateComparator(a[key], b[key]));
          break;
        default:
          break;
      }
    }
    if (sortDirection === "asc") {
      switch (sortType) {
        case "string":
          newData?.sort((a, b) => stringComparator(b[key], a[key]));
          break;
        case "number":
          newData?.sort((a, b) => numberComparator(b[key], a[key]));
          break;
        case "date":
          newData?.sort((a, b) => dateComparator(b[key], a[key]));
          break;
        default:
          break;
      }
    }
    if (sortDirection === "desc") {
      switch (sortType) {
        case "string":
          newData?.sort((a, b) => stringComparator(a[key], b[key]));
          break;
        case "number":
          newData?.sort((a, b) => numberComparator(a[key], b[key]));
          break;
        case "date":
          newData?.sort((a, b) => dateComparator(a[key], b[key]));
          break;
        default:
          break;
      }
    }
    setData(newData);
    setColumns(newColumns as ColumnType[]);
    setLocalStorage(tableMetaKey, {
      ...getLocalStorage(tableMetaKey),
      columns: newColumns,
      lastSortedColumn: column,
    });
  } else toast.error(`Column ${column?.name} is not sortable`);
};
