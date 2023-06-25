// React
import React, { useEffect } from "react";

// Next
import { useRouter, usePathname } from "next/navigation";

// MUI
import { Box, useMediaQuery, Theme } from "@mui/material";

// Redux
import { useSelector } from "react-redux";

// Constants
import {
  APP_BAR_HEIGHT,
  FOOTER_HEIGHT,
  MINI_SIDE_BAR_WIDTH,
} from "@/constants/globals";

const Content = ({ children }: { children: React.ReactNode }) => {
  // Next Router
  const router = useRouter();
  const pathName = usePathname();

  // Breakpoints States
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  // Redux States
  // const { isAuthenticated } = useSelector((state: any) => state.access);

  //   // Effects
  //   useEffect(() => {
  //     if (!isAuthenticated) signOut();
  //   }, [isAuthenticated]);

  return (
    <main
      style={{
        minHeight: `calc(100vh - ${APP_BAR_HEIGHT} - ${FOOTER_HEIGHT})`,
        marginTop: APP_BAR_HEIGHT,
        marginLeft: isMd ? 0 : MINI_SIDE_BAR_WIDTH,
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        transition: "all 500ms ease",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <Box className="leading-[1]">
          {pathName
            ?.split("/")
            ?.slice(1)
            ?.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  color:
                    i === pathName.split("/")?.slice(1)?.length - 1
                      ? "text.primary"
                      : "text.secondary",
                  fontWeight:
                    i === pathName?.split("/")?.slice(1)?.length - 1
                      ? "bold"
                      : "normal",
                }}
              >
                {item
                  ?.replace(/-/g, " ")
                  ?.replace(/\b\w/g, (l) => l?.toUpperCase())}
                {i !== pathName?.split("/")?.slice(1)?.length - 1 && (
                  <span className="mx-[0.3125rem]">/</span>
                )}
              </Box>
            ))}
        </Box>
        {children}
      </Box>
    </main>
  );
};

export default Content;
