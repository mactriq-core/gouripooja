// TO DO
// 1. replace icon with logo

// React
import React, { useEffect } from "react";

// Next
import { usePathname, useRouter } from "next/navigation";

// MUI
import {
  Box,
  useMediaQuery,
  Theme,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Button,
} from "@mui/material";

// Constants
import {
  MINI_SIDE_BAR_WIDTH,
  APP_BAR_HEIGHT,
  Z_MINI_SIDE_BAR,
} from "@/constants/globals";
import { links as Links } from "@/constants/config";
import Image from "next/image";
import { Groups3Outlined } from "@mui/icons-material";

const Mini = ({
  showNav,
  setShowNav,
  links,
  updateLinks,
}: {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  links: typeof Links;
  updateLinks: (pathName: string) => void;
}) => {
  // Next Router
  const router = useRouter();
  const pathName = usePathname();
  const paths = pathName.split("/");

  // Breakpoints States
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  // Disable Right Click On Mini Nav
  useEffect(() => {
    const elements = document.querySelectorAll("[id=mini-nav]");
    const preventDefault = (e: any) => e.preventDefault();
    elements.forEach((element) =>
      element.addEventListener("contextmenu", preventDefault)
    );
    return () =>
      elements.forEach((element) =>
        element.removeEventListener("contextmenu", preventDefault)
      );
  }, [showNav]);

  return (
    <Box
      id="mini-nav"
      sx={{
        backgroundColor: "primary.main",
        minWidth: MINI_SIDE_BAR_WIDTH,
        maxWidth: MINI_SIDE_BAR_WIDTH,
        height: "100vh",
        position: "fixed",
        left: isMd ? (showNav ? 0 : `-${MINI_SIDE_BAR_WIDTH}`) : 0,
        top: 0,
        bottom: 0,
        zIndex: Z_MINI_SIDE_BAR,
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        transition: "all 500ms ease",
      }}
    >
      <List className="!p-0">
        <ListItem className="!p-0">
          <ListItemButton
            sx={{
              width: `${MINI_SIDE_BAR_WIDTH} !important`,
              height: `${APP_BAR_HEIGHT} !important`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* REPLACE WITH SVG LOGO  */}
            {/* <Groups3Outlined /> */}
            <Typography
              variant="body1"
              sx={{ color: "whitesmoke", fontWeight: 600, lineHeight: 1 }}
            >
              DSV
            </Typography>
          </ListItemButton>
        </ListItem>
        {links?.map(({ groups, id, name }) => (
          <Tooltip key={id} title={showNav ? null : name} placement="right">
            <ListItem
              className={`!p-0 ${
                name?.toLowerCase() === paths[1]?.toLowerCase()
                  ? "text-white"
                  : "text-white/40"
              }`}
              onAuxClickCapture={() => {
                updateLinks(name);
                setShowNav(true);
              }}
              onClick={() => {
                const lastVisitedLink = groups
                  ?.map((group) => group?.links)
                  ?.flat()
                  ?.find((link) => link?.isVisited)?.url;
                router?.push(lastVisitedLink as any);
                updateLinks(name);
                setShowNav(false);
              }}
            >
              <ListItemButton
                sx={{
                  width: `${MINI_SIDE_BAR_WIDTH} !important`,
                  height: `${APP_BAR_HEIGHT} !important`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {Links?.find((link) => link?.name === name)?.icon}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default Mini;
