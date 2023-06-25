// React
import React, { useState, useEffect } from "react";

// Icons
import { Search as SearchIcon } from "@mui/icons-material";

// Components
import SearchBar from "./SearchBar";

const Search = () => {
  // States
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Listen ctrl + / to open search bar
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && event.key === "/") setShowSearchBar(true);
      if (event.metaKey && event.key === "/") setShowSearchBar(true);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SearchIcon onClick={() => setShowSearchBar(true)} className="pointer" />
      <SearchBar
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
      />
    </>
  );
};

export default Search;
