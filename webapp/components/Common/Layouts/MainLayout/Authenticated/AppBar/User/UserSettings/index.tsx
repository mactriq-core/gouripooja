// React
import React from "react";

// MUI
import { Box, Modal } from "@mui/material";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { userSettingsActions } from "@/store/user-settings/user-settings-slice";

// Components
import UserSettingsSidebar from "./UserSettingsSidebar";
import Content from "./Content";

const UserSettings = () => {
  // Redux Dispatch
  const dispatch = useDispatch();

  // Redux States
  const { showUserSettings } = useSelector((state: any) => state.userSettings);

  // Modal Styles
  const style = {
    bgcolor: "background.paper",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: "56.25rem",
    height: "85%",
    overflow: "hidden",
    boxShadow: 18,
    borderRadius: "4px",
    display: "flex",
    "&:focus": { outline: "none" },
  };

  return (
    <Modal
      open={showUserSettings}
      onClose={() => dispatch(userSettingsActions.resetUserSettings())}
    >
      <Box sx={style}>
        <UserSettingsSidebar />
        <Content />
      </Box>
    </Modal>
  );
};

export default UserSettings;
