// React
import React from "react";

// Redux
import { useDispatch } from "react-redux";
import { userSettingsActions } from "@/store/user-settings/user-settings-slice";

// Icons
import { NotificationsNoneOutlined } from "@mui/icons-material";

const Notification = () => {
  // Redux Dispatch
  const dispatch = useDispatch();

  return (
    <NotificationsNoneOutlined
      onClick={() => {
        dispatch(userSettingsActions.setActiveSetting(1));
        dispatch(userSettingsActions.toggleUserSettings());
      }}
      className="pointer"
    />
  );
};

export default Notification;
