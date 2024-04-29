"use client";

import { createContext, useEffect, useReducer } from "react";

const initialState = {
  id: null,
  itemCode: "",
  itemName:'',
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
    case "id":
      return { ...state, id: action.payload };
    case "itemCode":
      return { ...state, itemCode: action.payload };
      case "itemName":
      return { ...state, itemName: action.payload };
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
      return {
        id: null,
        itemCode: "",
        qty1: null,
        fee: null,
        amount: null,
        discountPercent: null,
        discountAmount: null,
        remindNet: null,
      };
    default:
      return state;
  }
};

export default function OrderLinesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const amount = state.qty1 * state.fee;
    const discountAmount = state.discountPercent * amount;
    const remindnet = Math.abs(amount - discountAmount);
    dispatch({ type: "amount", payload: +amount });
    dispatch({ type: "discountAmount", payload: +discountAmount });
    dispatch({ type: "remindNet", payload: +remindnet });
    const id = Math.floor(Math.random() * 100000000);
    dispatch({ type: "id", payload: id });
  }, [state.qty1, state.amount, state.discountPercent, state.fee]);

  return (
    <OrderLinesContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderLinesContext.Provider>
  );
}
