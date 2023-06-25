// React
import React from "react";

// MUI
import { TextField, InputAdornment } from "@mui/material";

// Icons
import { Search as SearchIcon } from "@mui/icons-material";

// Lib
import { setLocalStorage, getLocalStorage } from "@/lib/local-storage";

const Search = ({
  tableMetaKey,
  search,
  setSearch,
}: {
  tableMetaKey: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(e) => {
        setSearch(e?.target?.value);
        setLocalStorage(tableMetaKey, {
          ...getLocalStorage(tableMetaKey),
          lastSearch: e?.target?.value,
        });
      }}
      value={search}
      className="flex-1"
    />
  );
};

export default Search;
