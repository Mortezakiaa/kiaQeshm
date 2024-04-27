"use client";

import { createContext, useReducer } from "react";

export const AuthContext = createContext({} as any);

const reducer = (state = initialState, action:any) => {
  switch (action.type) {
    case "set":
      return {...state , firstName:action.firstName , lastName:action.lastName};
    default:
      return state;
  }
};
const initialState = {
  firstName: "",
  lastName: "",
};

export default function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{state , dispatch}}>{children}</AuthContext.Provider>
  );
}
