// React
import React from "react";

// Next
import { usePathname, useRouter } from "next/navigation";

// MUI
import { Box, useMediaQuery, Theme } from "@mui/material";

// Components
import Notifications from "./Notifications";
import User from "./User";
import Search from "./Search";

// Icons
import GridViewIcon from "@mui/icons-material/GridView";

// Constants
import {
  MINI_SIDE_BAR_WIDTH,
  APP_BAR_HEIGHT,
  Z_APP_BAR,
} from "@/constants/globals";

const AppBar = ({
  setShowNav,
  updateLinks,
}: {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  updateLinks: (pathName: string) => void;
}) => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <header
      style={{
        height: APP_BAR_HEIGHT,
        display: "flex",
        position: "fixed",
        top: 0,
        left: isMd ? 0 : MINI_SIDE_BAR_WIDTH,
        right: 0,
        zIndex: Z_APP_BAR,
        transition: "all 500ms ease",
      }}
      className="shadow"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          height: APP_BAR_HEIGHT,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.25rem",
          px: "1.25rem",
          transition: "all 500ms ease",
        }}
      >
        <Box className="flex items-center gap-[1.25rem]">
          <div>This is the app bar</div>
          {/* <Search /> */}
          {/* <Notifications /> */}
          {/* <User /> */}
        </Box>
      </Box>
    </header>
  );
};

// const AppBar1 = ({
//   setShowNav,
//   updateLinks,
// }: {
//   setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
//   updateLinks: (pathName: string) => void;
// }) => {
//   // Next Router
//   const router = useRouter();
//   const pathName = usePathname();
//   const paths = pathName.split("/");

//   // Breakpoints States
//   const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

//   return (
//     <header
//       style={{
//         height: APP_BAR_HEIGHT,
//         display: "flex",
//         position: "fixed",
//         top: 0,
//         left: isMd ? 0 : MINI_SIDE_BAR_WIDTH,
//         right: 0,
//         zIndex: Z_APP_BAR,
//         transition: "all 500ms ease",
//       }}
//       className="shadow"
//     >
//       <Box
//         sx={{
//           bgcolor: "background.paper",
//           color: "text.primary",
//           height: APP_BAR_HEIGHT,
//           flex: 1,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: "1.25rem",
//           px: "1.25rem",
//           transition: "all 500ms ease",
//         }}
//       >
//         <Box className="flex items-center gap-[1.25rem] sm:flex-1">
//           <GridViewIcon
//             sx={{ fontSize: "1.6rem", display: { md: "none" } }}
//             className="pointer"
//             onClick={() => {
//               updateLinks(paths[1]);
//               setShowNav(true);
//             }}
//           />
//           {/* <InstitutesDropdown /> */}
//         </Box>
//         <Box className="flex items-center gap-[1.25rem]">
//           <Search />
//           <Notifications />
//           <User />
//         </Box>
//       </Box>
//     </header>
//   );
// };

export default AppBar;
