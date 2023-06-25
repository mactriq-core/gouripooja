// React
import React from "react";

// Next
import { signOut } from "next-auth/react";

// MUI
import {
  List,
  Divider,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  Theme,
} from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { userSettingsActions } from "@/store/user-settings/user-settings-slice";

const UserSettingsSidebar = () => {
  // Redux Dispatch
  const dispatch = useDispatch();

  // Redux States
  const { activeSetting, userSettings } = useSelector(
    (state: any) => state.userSettings
  );

  // Breakpoints States
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        display: activeSetting >= 0 && isSm ? "none" : "flex",
      }}
      className="w-[16.875rem] sm:w-full h-full border-r flex-col sm:absolute sm:inset-0"
    >
      <Box className="px-[1.25rem] min-h-[3.125rem] flex items-center gap-[0.625rem]">
        <CloseIcon
          onClick={() => dispatch(userSettingsActions.resetUserSettings())}
          sx={{ cursor: "pointer" }}
        />
        <Typography variant="button">Profile Settings</Typography>
      </Box>
      <Divider />
      <List
        sx={{ p: 0 }}
        className="flex-1 flex flex-col overflow-y-auto scrollbar"
      >
        {userSettings?.map((setting: any, i: number) => (
          <ListItem key={i} disablePadding>
            <ListItemButton
              onClick={() =>
                dispatch(userSettingsActions.setActiveSetting(setting.id))
              }
              className="!px-[1.25rem] flex items-center gap-[0.625rem]"
              sx={{
                bgcolor:
                  activeSetting === setting.id
                    ? "rgba(0,0,0,0.1)"
                    : "transparent",
              }}
            >
              <ListItemIcon
                sx={{ minWidth: "max-content", color: "text.secondary" }}
              >
                <setting.icon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">{setting.name}</Typography>
                }
                sx={{ color: "text.secondary" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider className="!mt-auto" />
        <ListItem disablePadding>
          <ListItemButton
            className="!px-[1.25rem] flex items-center gap-[0.625rem]"
            onClick={() => signOut()}
          >
            <ListItemIcon
              sx={{ minWidth: "max-content", color: "error.light" }}
            >
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">Logout</Typography>}
              sx={{ color: "error.light" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default UserSettingsSidebar;
