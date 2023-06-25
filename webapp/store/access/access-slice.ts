import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isAuthenticated: boolean;
  isComponentsAuthorized: {
    [key: string]: boolean;
  };
} = {
  isAuthenticated: true, // logout if false
  isComponentsAuthorized: {
    // Category
    categoryList: true,
    createCategory_updateCategory: true,
    loadCategory_unlockCategory: true,

    // // Users
    // userList_enableUser_disableUser: true,
    // createUser: true,
    // updateUser: true,
    // deleteUser: true,
    // inUserGetUserPolicyList: true,
    // inUserGetAllPolicyList_attachPolicy: true,
    // detachPolicy: true,
  },
};

const accessSlice = createSlice({
  name: "access",
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setComponentsAuthorized(state, action) {
      state.isComponentsAuthorized = {
        ...state.isComponentsAuthorized,
        ...action.payload,
      };
    },
  },
});

export const accessActions = accessSlice.actions;
export default accessSlice.reducer;
