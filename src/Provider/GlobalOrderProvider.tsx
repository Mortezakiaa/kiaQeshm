"use clien";
import { GlobalOrderStore } from "@/StateManagment/Store/globalOrderStore";
import { Provider } from "react-redux";

type T = { children: React.ReactNode };

export default function GlobalOrderProvider({ children }: T) {
  return <Provider store={GlobalOrderStore}>{children}</Provider>;
}
