import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: false };

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
