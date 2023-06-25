// React
import React from "react";

// Next
import { usePathname, useRouter } from "next/navigation";

// MUI
import {
  Typography,
  Box,
  Backdrop,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";

// Icons
import {
  KeyboardBackspace,
  Adjust,
  RadioButtonUnchecked,
} from "@mui/icons-material";

// Constants
import {
  Z_FULL_SIDE_BAR_BACKDROP,
  Z_FULL_SIDE_BAR,
  FULL_SIDE_BAR_WIDTH,
  MINI_SIDE_BAR_WIDTH,
  APP_BAR_HEIGHT,
} from "@/constants/globals";
import { links as Links } from "@/constants/config";

const Full = ({
  showNav,
  setShowNav,
  links,
  updateLinks,
  updateLinksInLocalStorage,
}: {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  links: typeof Links;
  updateLinks: (pathName: string) => void;
  updateLinksInLocalStorage: (parentName: string, fullUrl: string) => void;
}) => {
  // Next Router
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <Backdrop
        transitionDuration={500}
        open={showNav}
        onClick={() => setShowNav(false)}
        sx={{ zIndex: Z_FULL_SIDE_BAR_BACKDROP }}
      />
      <Box
        sx={{
          backgroundColor: "primary.light",
          color: "common.white",
          width: FULL_SIDE_BAR_WIDTH,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: showNav ? MINI_SIDE_BAR_WIDTH : `-${FULL_SIDE_BAR_WIDTH}`,
          bottom: 0,
          zIndex: Z_FULL_SIDE_BAR,
          overflowY: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          transition: "all 500ms ease",
          display: "flex",
        }}
      >
        <Box className="w-full h-full flex flex-col">
          <Toolbar
            className="!p-0"
            sx={{ minHeight: `${APP_BAR_HEIGHT} !important` }}
          >
            <ListItemButton
              onClick={() => setShowNav(false)}
              sx={{
                width: "100%",
                height: "100%",
                px: "0.625rem",
              }}
            >
              <KeyboardBackspace
                sx={{
                  mr: "0.625rem",
                  fontSize: "1.75rem",
                }}
              />
              <ListItemText
                sx={{ textTransform: "capitalize" }}
                primary={links?.find((link) => link?.isActive)?.name}
                primaryTypographyProps={{ noWrap: true }}
              />
            </ListItemButton>
          </Toolbar>
          <Divider className="!m-0" />
          <List className="!m-0 !p-[0.625rem] flex flex-col gap-[0.625rem]">
            {links?.map(({ name, groups, isActive }) => {
              if (isActive) {
                return groups?.map(({ name: groupName, links }) => {
                  return (
                    <ListItem
                      key={groupName}
                      className="!p-0 !m-0 flex flex-col"
                    >
                      <Box
                        sx={{
                          width: "100%",
                          px: "1rem",
                          py: "0.5rem",
                          mb: "1px",
                          backgroundColor: "rgba(255,255,255,0.1)",
                          textTransform: "capitalize",
                          "& .MuiTypography-root": { fontWeight: 500 },
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <Adjust sx={{ fontSize: "0.875rem" }} />
                        <Typography>{groupName}</Typography>
                      </Box>
                      {links?.map(({ name: linkName, url }) => {
                        return (
                          <ListItemButton
                            key={linkName}
                            onClick={() => {
                              updateLinks(url);
                              updateLinksInLocalStorage(name, url);
                              router.push(url);
                              setShowNav(false);
                            }}
                            sx={{
                              width: "100%",
                              px: "1rem",
                              py: "0.5rem",
                              backgroundColor:
                                url?.split("/")[3] === pathName.split("/")[3]
                                  ? "rgba(255,255,255,0.3)"
                                  : "rgba(255,255,255,0.1)",
                              "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.2)",
                              },
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <RadioButtonUnchecked
                              sx={{ fontSize: "0.875rem" }}
                            />
                            <ListItemText
                              sx={{
                                width: "100%",
                                m: 0,
                                p: 0,
                                "& .MuiTypography-root": {
                                  fontSize: "0.875rem",
                                },
                              }}
                              primary={linkName}
                            />
                          </ListItemButton>
                        );
                      })}
                    </ListItem>
                  );
                });
              }
            })}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Full;
