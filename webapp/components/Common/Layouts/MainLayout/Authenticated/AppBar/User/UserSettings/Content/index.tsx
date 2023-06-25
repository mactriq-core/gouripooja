// React
import React from "react";

// MUI
import { Box, Typography, useMediaQuery, Theme, Divider } from "@mui/material";

// Components
import Profile from "../Components/Profile";
import Inbox from "../Components/Inbox";
import ChangePassword from "../Components/ChangePassword";
import ConfirmAccount from "../Components/ConfirmAccount";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { userSettingsActions } from "@/store/user-settings/user-settings-slice";

// Icons
import { KeyboardBackspace } from "@mui/icons-material";

// Content
const contents: any = {
  Profile: <Profile />,
  Inbox: <Inbox />,
  "Change Password": <ChangePassword />,
  "Confirm Account": <ConfirmAccount />,
};

const Content = () => {
  // Redux Dispatch
  const dispatch = useDispatch();

  // Redux States
  const { activeSetting, userSettings } = useSelector(
    (state: any) => state.userSettings
  );

  // Breakpoints States
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: activeSetting < 0 ? (isSm ? "none" : "flex") : "flex",
      }}
      className="flex-1 flex-col"
    >
      {activeSetting < 0 && (
        <Box className="flex-1 flex items-center justify-center text-center">
          <Typography variant="body1">
            SELECT A SETTING TO VIEW CONTENT
          </Typography>
        </Box>
      )}
      {activeSetting >= 0 && (
        <Box className="flex-1 flex flex-col overflow-y-auto">
          <Box className="px-[1.25rem] min-h-[3.125rem] flex items-center gap-[0.625rem]">
            <KeyboardBackspace
              onClick={() => dispatch(userSettingsActions.goBack())}
              className="pointer"
            />
            <Typography variant="button">
              {userSettings[activeSetting]?.name}
            </Typography>
          </Box>
          <Divider />
          <div className="flex-1 flex flex-col p-[1.25rem] overflow-y-auto scrollbar">
            {contents[userSettings[activeSetting]?.name]}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Content;
