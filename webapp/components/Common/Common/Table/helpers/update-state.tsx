// React
import React from "react";

// Types & Enums
import { ColumnType, TableMetaType } from "@/types/global-types";

// Lib
import { getLocalStorage, setLocalStorage } from "@/lib/local-storage";
import { handleSort } from "./handle-sort";

export const updateState = (
  data: any[],
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
  tableMeta: TableMetaType,
  tableMetaKey: string
) => {
  if (data.length > 0) {
    const localTableMeta: TableMetaType = getLocalStorage(tableMetaKey);
    if (localTableMeta) {
      if (localTableMeta?.lastSortedColumn) {
        handleSort(
          localTableMeta?.lastSortedColumn,
          data,
          setData,
          setColumns,
          tableMetaKey
        );
      } else {
        setData(data);
        setColumns(localTableMeta?.columns);
      }
      setSearch(localTableMeta?.lastSearch);
      setPage(localTableMeta?.lastPage);
      setRowsPerPage(localTableMeta?.lastRowsPerPage);
    } else {
      setData(data);
      setLocalStorage(tableMetaKey, tableMeta);
    }
  }
};
