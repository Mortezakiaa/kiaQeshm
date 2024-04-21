import OrderList from "@/forms/OrderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست سفارشات",
};

export default function page() {
  return <div dir="rtl">
  <OrderList/>
  </div>;
}
