import { userSettings } from "@/constants/config";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showUserSettings: false,
  userSettings,
  activeSetting: -1,
};

const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    toggleUserSettings(state) {
      state.showUserSettings = !state.showUserSettings;
    },
    setActiveSetting(state, action) {
      state.activeSetting = action.payload;
    },
    resetUserSettings(state) {
      state.showUserSettings = false;
      state.activeSetting = -1;
    },
    goBack(state) {
      state.activeSetting = -1;
    },
  },
});

export const userSettingsActions = userSettingsSlice.actions;
export default userSettingsSlice.reducer;
