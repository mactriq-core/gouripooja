// React
import React, { useState, useEffect } from "react";

// Next
import { useRouter } from "next/router";

// MUI
import {
  Box,
  Divider,
  Modal,
  InputBase,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Icons
import { Search, Launch } from "@mui/icons-material";

// Redux
import { useDispatch } from "react-redux";
import { userSettingsActions } from "@/store/user-settings/user-settings-slice";

// Data
import { links, userSettings } from "@/constants/config";

// Search Initial State
const initialState = {
  links: links
    ?.map?.((item) => item?.groups?.map((group) => group?.links))
    ?.flat(2),
  manageProfile: userSettings,
};

const SearchBar = ({
  showSearchBar,
  setShowSearchBar,
}: {
  showSearchBar: boolean;
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Next Router
  const router = useRouter();

  // States
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(initialState);

  // Redux Dispatch
  const dispatch = useDispatch();

  // Handle Open User Settings
  const openUserSettings = (index: number) => {
    setShowSearchBar(false);
    dispatch(userSettingsActions.setActiveSetting(index));
    dispatch(userSettingsActions.toggleUserSettings());
  };

  // Handle Open Link
  const openLink = (href: string) => {
    setShowSearchBar(false);
    router.push(href);
  };

  // Modal Styles
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: "34.375rem",
    minHeight: search ? "75%" : "auto",
    maxHeight: "75%",
    backgroundColor: "background.paper",
    overflow: "hidden",
    boxShadow: 18,
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column" as "column",
    "&:focus": { outline: "none" },
  };

  // Update Search Results
  useEffect(() => {
    if (!search) {
      setSearchResults(initialState);
    } else {
      const results: any = { ...initialState };
      Object.keys(results)?.map((key: any) => {
        results[key] = (results[key] as any)?.filter((item: any) => {
          return (item?.title || item?.name || item?.label)
            ?.toLowerCase()
            ?.includes?.(search?.toLowerCase?.());
        });
      });
      setSearchResults(results);
    }
  }, [search]);

  return (
    <Modal open={showSearchBar} onClose={() => setShowSearchBar(false)}>
      <Box sx={style}>
        <div className="min-h-[4.375rem] flex">
          <InputBase
            className="flex-1 px-[1.25rem]"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            startAdornment={
              <Search sx={{ mr: "1.25rem", color: "text.secondary" }} />
            }
          />
          <Typography
            variant="body1"
            sx={{ color: "text.disabled" }}
            className="flex items-center px-[1.25rem] pointer"
            onClick={() => setShowSearchBar(false)}
          >
            ESC
          </Typography>
        </div>
        <Divider />
        {Object.values(searchResults)?.flat()?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-[2.5rem] p-[2.5rem] overflow-y-auto scrollbar">
            {Object.keys(searchResults).map((key: any, i: any) => {
              const maxSuggestions = 4;
              const maxKeyMap = search
                ? (searchResults as any)[key]?.length
                : maxSuggestions;
              if ((searchResults as any)[key]?.length > 0) {
                return (
                  <div key={i} className="flex flex-col">
                    <Typography
                      variant="button"
                      sx={{ color: "text.disabled" }}
                    >
                      {key
                        ?.replace(/([A-Z])/g, " $1")
                        ?.replace(/^./, (str: string) => str.toUpperCase())}
                    </Typography>
                    <List className="flex flex-col gap-[0.625rem] !pb-0">
                      {(searchResults as any)[key]?.map((item: any, i: any) => {
                        const isLinks = key === "links";
                        const isModules = key === "modules";
                        const isManageProfile = key === "manageProfile";
                        if (i < maxKeyMap) {
                          return (
                            <ListItem
                              key={i}
                              className="!p-0 !gap-[0.5rem] pointer"
                              onClick={() => {
                                if (isLinks || isModules)
                                  openLink(
                                    item.href ||
                                      item.path ||
                                      item.url ||
                                      item.link
                                  );
                                if (isManageProfile) openUserSettings(i);
                              }}
                            >
                              <ListItemIcon className="!min-w-max">
                                {item?.icon ? (
                                  <item.icon sx={{ color: "text.secondary" }} />
                                ) : (
                                  <Launch sx={{ color: "text.secondary" }} />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="overline"
                                    className="!leading-normal"
                                    sx={{ color: "text.secondary" }}
                                  >
                                    {item.title || item.name || item.label}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          );
                        }
                      })}
                    </List>
                  </div>
                );
              }
            })}
          </div>
        )}
        {Object.values(searchResults)?.flat()?.length === 0 && (
          <div className="p-[1.25rem] flex-1 flex items-center justify-center text-center">
            <Typography variant="body1" sx={{ color: "text.disabled" }}>
              No results found
            </Typography>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default SearchBar;
