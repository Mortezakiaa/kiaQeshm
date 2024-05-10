"use client";
import store from "@/StateManagment/Store/store";
import { Provider } from "react-redux";

type T = { children: React.ReactNode };

export default function GlobalOrderProvider({ children }: T) {
  return <Provider store={store}>{children}</Provider>;
}
