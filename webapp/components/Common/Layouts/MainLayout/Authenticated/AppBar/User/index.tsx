// React
import React, { useState, SyntheticEvent } from "react";

// Next
import { usePathname, useRouter } from "next/navigation";

// Next Auth
import { signOut, useSession } from "next-auth/react";

// MUI
import {
  Box,
  Menu,
  Badge,
  Avatar,
  Divider,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";

// Components
import UserSettings from "./UserSettings";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { userSettingsActions } from "@/store/user-settings/user-settings-slice";

// Icons
import { ExitToAppOutlined } from "@mui/icons-material";

// Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: "0.5rem",
  height: "0.5rem",
  borderRadius: "50%",
  backgroundColor: theme.palette.success.light,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const User = () => {
  // Next Router
  const router = useRouter();
  const pathName = usePathname();

  // Next Auth Session
  const { data: session }: any = useSession();

  // Redux Dispatch
  const dispatch = useDispatch();

  // Redux State
  const { userSettings } = useSelector((state: any) => state.userSettings);

  // States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // Handle Open Menu
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle Close Menu
  const handleDropdownClose = (url?: string) => {
    if (url) router.push(url);
    setAnchorEl(null);
  };

  // Styles
  const itemStyles = {
    py: "0.75rem",
    px: "1rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    color: "text.primary",
    "& svg": {
      fontSize: "1.5rem",
      color: "text.secondary",
    },
  };
  const logoutItemStyles = {
    py: "0.75rem",
    px: "1rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    color: "error.light",
    "& svg": {
      fontSize: "1.5rem",
      color: "error.light",
    },
  };

  return (
    <>
      <Badge
        className="pointer"
        overlap="circular"
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClick={handleDropdownOpen}
      >
        <Avatar
          alt="Profile Picture"
          onClick={handleDropdownOpen}
          sx={{ width: "2.5rem", height: "2.5rem" }}
          src={`${session?.user?.name?.picture}?random=${new Date().getTime()}`}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{
          "& .MuiMenu-paper": { width: "15rem", marginTop: "1rem" },
          "& .css-6hp17o-MuiList-root-MuiMenu-list": { padding: 0 },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "1rem", p: "1rem" }}
        >
          <Badge
            overlap="circular"
            badgeContent={<BadgeContentSpan />}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Avatar
              alt="Profile Picture"
              src={`${
                session?.user?.name?.picture
              }?random=${new Date().getTime()}`}
            />
          </Badge>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontWeight: 600 }}>
              {session?.user?.name?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.disabled" }}>
              @{session?.user?.name?.username}
            </Typography>
          </Box>
        </Box>
        <Divider className="!m-0" />
        {userSettings.map((setting: any, i: number) => (
          <MenuItem
            sx={{ p: 0, m: 0 }}
            onClick={() => {
              dispatch(userSettingsActions.setActiveSetting(i));
              dispatch(userSettingsActions.toggleUserSettings());
              handleDropdownClose();
            }}
            key={i}
          >
            <Box sx={itemStyles}>
              <setting.icon />
              {setting.name}
            </Box>
          </MenuItem>
        ))}
        <Divider className="!m-0" />
        <MenuItem
          sx={{ p: 0, m: 0 }}
          onClick={() => {
            handleDropdownClose();
            signOut();
          }}
        >
          <Box sx={logoutItemStyles}>
            <ExitToAppOutlined />
            Logout
          </Box>
        </MenuItem>
      </Menu>
      <UserSettings />
    </>
  );
};

export default User;
