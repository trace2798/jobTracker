import React, { useState, useReducer, useContext } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT, } from "./actions";

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  // {The first argument, reducer, is a function that takes in the current state and an action as parameters and returns a new state based on the action performed. The reducer function is called by the dispatch function which is the second element in the array returned by the useReducer hook. dispatch is a function that accepts an action and uses the reducer function to update the state. The second argument, initialState, is the initial value of the state. It can be an object, an array, or any other data type. The useReducer hook returns an array with two elements: state and dispatch. state is the current value of the state, and dispatch is a function that allows you to update the state.}
  // Is a declaration of a state and dispatch function using the useReducer hook in React.
  const [state, dispatch] = useReducer(reducer, initialState);


  /**
   * When the user clicks the button, display the alert and then clear the alert.
   */
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  /**
   * After 3 seconds, dispatch an action to clear the alert.
   */
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
