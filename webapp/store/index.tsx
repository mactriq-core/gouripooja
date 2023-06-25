// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Slices
import themeSlice from "./theme/theme-slice";
import userSettingsSlice from "./user-settings/user-settings-slice";
// import loadingSlice from "./loading/loading-slice";
// import institutesSlice from "./institutes/institutes-slice";
// import teamsSlice from "./teams/teams-slice";
// import accessSlice from "./access/access-slice";
// import cbpSlice from "./cbp/cbp-slice";

// Configure Store
const store = configureStore({
  reducer: {
    theme: themeSlice,
    userSettings: userSettingsSlice,
    // loading: loadingSlice,
    // institutes: institutesSlice,
    // teams: teamsSlice,
    // access: accessSlice,
    // cbp: cbpSlice,
  },
});

export default store;
