"use client";

import { createContext, useReducer } from "react";

const initialState = {
  id: Math.floor(Math.random() * 10000000000),
  itemCode: "",
  qty1: null,
  fee: null,
  amount: null,
  discountPercent: null,
  discountAmount: null,
  remindNet: null,
};
export const OrderLinesContext = createContext(initialState);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "itemCode":
      return { ...state, itemCode: action.payload };
    case "qty1":
      return { ...state, qty1: action.payload };
    case "fee":
      return { ...state, fee: action.payload };
    case "amount":
      return { ...state, amount: action.payload };
    case "discountPercent":
      return { ...state, discountPercent: action.payload };
    case "discountAmount":
      return { ...state, discountAmount: action.payload };
    case "remindNet":
      return { ...state, remindNet: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

export default function OrderLinesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrderLinesContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderLinesContext.Provider>
  );
}
