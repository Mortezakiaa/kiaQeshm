import { Metadata } from "next";
import Order from "@/forms/Order";
import { redirect } from "next/navigation";
import { getCookie } from "@/actions/getCookie";

export const metadata: Metadata = {
  title: "ثبت سفارشات",
};

export default async function page() {
  const isExistCookie = await getCookie();
  if (!isExistCookie) redirect("/Login");
  
  return (
    <div dir="rtl">
      <Order />
    </div>
  );
}
