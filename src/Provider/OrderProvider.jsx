"use client";

import { createContext, useReducer } from "react";

const initialState = {
  inventoryCode: null,
  accountingCode: "",
  saleExpertCode: "",
  date: "",
  description1: "",
  description2: "",
  customerCode: "",
  orderLines: [],
  discount: null,
};
export const OrderContext = createContext(initialState);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'inventoryCode' : return {...state , inventoryCode:action.payload}
    case 'accountingCode' : return {...state , accountingCode:action.payload}
    case 'saleExpertCode' : return {...state , saleExpertCode:action.payload}
    case 'date' : return {...state , date:action.payload}
    case 'description1' : return {...state , description1:action.payload}
    case 'description2' : return {...state , description2:action.payload}
    case 'customerCode' : return {...state , customerCode:action.payload}
    case 'orderLines' : return {...state , orderLines:[...orderLines , action.payload]}
    case 'discount' : return {...state , discount:action.payload}
    default:
      return state;
  }
};

export default function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}
