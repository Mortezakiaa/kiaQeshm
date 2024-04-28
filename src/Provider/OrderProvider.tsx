"use client";

import { createContext, useReducer } from "react";

const initialState = {};
export const OrderContext = createContext(initialState);

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default function OrderProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <OrderContext.Provider value={{state,dispatch}}>{children}</OrderContext.Provider>;
}
