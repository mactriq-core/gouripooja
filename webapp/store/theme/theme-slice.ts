// Redux Toolkit Create Slice
import { createSlice } from "@reduxjs/toolkit";

// Constants
import { THEME_COLOR, THEME_MODE } from "@/constants/globals";

// Types & Enums
import { ThemeSliceType } from "@/types/global-types";

// Initial State
const initialState: ThemeSliceType = {
  mode: THEME_MODE,
  themeColor: THEME_COLOR,
};

// Redux Toolkit Slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, { payload }: { payload: ThemeSliceType }) => {
      state.mode = payload.mode;
      state.themeColor = payload.themeColor;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
