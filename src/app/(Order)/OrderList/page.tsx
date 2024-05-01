import OrderList from "@/forms/OrderList";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCookie } from "@/actions/getCookie";

export const metadata: Metadata = {
  title: "لیست سفارشات",
  description: "Generated by amisa.me"
};

export default async function page() {
  const isExistCookie = await getCookie()
  if(!isExistCookie) redirect('/Login')

  return <div dir="rtl">
  <OrderList/>
  </div>;
}
