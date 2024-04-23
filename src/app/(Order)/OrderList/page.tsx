import OrderList from "@/forms/OrderList";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "لیست سفارشات",
};

export default function page() {
  const coockie = cookies().get('token')
  if(!coockie) redirect('/Login')
  return <div dir="rtl">
  <OrderList/>
  </div>;
}
