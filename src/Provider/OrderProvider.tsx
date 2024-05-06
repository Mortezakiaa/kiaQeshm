"use client";

import { OrderContextType, OrderLinesContext } from "@/Types/Types";
import { createContext, useEffect, useReducer } from "react";

const initialState: OrderContextType = {
  inventoryCode: null,
  inventoryName: '',
  accountingCode: "",
  accountingName:'',
  saleExpertCode: "",
  saleExpertName: "",
  date: "",
  description1: "",
  description2: "",
  customerCode: "",
  customerName: "",
  orderLines: [],
  discount: null,
  editMode: false,
  editId: null,
};
export const OrderContext = createContext(initialState);

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "inventoryCode":
      return { ...state, inventoryCode: action.payload };
    case "accountingCode":
      return { ...state, accountingCode: action.payload };
      case "accountingName":
        return { ...state, accountingName: action.payload };
    case "saleExpertCode":
      return { ...state, saleExpertCode: action.payload };
    case "date":
      return { ...state, date: action.payload };
    case "description1":
      return { ...state, description1: action.payload };
    case "description2":
      return { ...state, description2: action.payload };
    case "customerCode":
      return { ...state, customerCode: action.payload };
    case "customerName":
      return { ...state, customerName: action.payload };
    case "orderLines":
      return { ...state, orderLines: [...state.orderLines, action.payload] };
    case "discount":
      return { ...state, discount: action.payload };
    case "editMode":
      return { ...state, editMode: action.payload };
    case "editId":
      return { ...state, editId: action.payload };
    case "deleteRecord":
      return {
        ...state,
        orderLines: state.orderLines.filter((i) => i.id !== action.payload),
      };
    case "update":
      return { ...state, orderLines: action.payload };
    default:
      return state;
  }
};

export interface Provider {
  children: React.ReactNode;
}

export default function OrderProvider({ children }: Provider) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const num = state.orderLines?.map((i: OrderLinesContext) => {
      let num = 0;
      num += i.discountAmount ?? 0;
      return num;
    });
    dispatch({ type: "discount", payload: num[0] ?? 0 });
  }, [state.orderLines]);

  return (
    <OrderContext.Provider value={{ state , dispatch } as any}>
      {children}
    </OrderContext.Provider>
  );
}
