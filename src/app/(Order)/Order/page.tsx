import { Metadata } from "next";
import Order from "@/forms/Order";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ثبت سفارشات",
};

export default function page() {
  const coockie = cookies().get('token')
  if(!coockie) redirect('/Login')
  return (
    <div dir="rtl">
      <Order />
    </div>
  );
}
