import React from "react";
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

import { initialState } from "./appContext";

/**
 * A reducer that throws an error if the action type is not found.
 * @param {object} state - the current state of the reducer
 * @param {object} action - the action to be performed
 * @returns {object} the new state of the reducer
 */

const reducer = (state, action) => {
  
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  throw new Error(`no such action :${action.type}`);
};
export default reducer;
