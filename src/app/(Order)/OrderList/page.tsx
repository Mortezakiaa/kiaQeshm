import OrderList from "@/forms/OrderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست سفارشات",
  description: "Generated by amisa.me"
};

export default async function page() {
  return <div dir="rtl">
  <OrderList/>
  </div>;
}
