// Actions
import { accessActions } from "./access-slice";

// Toast
import { toast } from "react-hot-toast";

// Types & Enums
import { Dispatch } from "@reduxjs/toolkit";

export const manageAccessState = (object: {
  statusCode: number;
  keyName: string;
}) => {
  return (dispatch: Dispatch) => {
    const { statusCode, keyName } = object;
    if (statusCode === 401) {
      dispatch(accessActions.setAuthenticated(false));
      toast.error("Logging out due to inactivity.");
    }
    if (statusCode === 403) {
      dispatch(accessActions.setComponentsAuthorized({ [keyName]: false }));
      toast.error("You are not authorized to access this page.");
    }
  };
};
