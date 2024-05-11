import { Metadata } from "next";
import Order from "@/forms/Order";
import { redirect } from "next/navigation";
import { getCookie } from "@/actions/getCookie";
import OrderProvider from "@/Provider/OrderProvider";
import OrderLinesProvider from "@/Provider/OrderLinesProvider";
import GlobalOrderProvider from "@/Provider/GlobalOrderProvider";

export const metadata: Metadata = {
  title: "ثبت سفارشات",
  description: "Generated by amisa.me",
};

export default async function page() {
  const isExistCookie = await getCookie();
  if (!isExistCookie) redirect("/Login");

  return (
    <div dir="rtl">
      {/* <OrderProvider> */}
        {/* <OrderLinesProvider> */}
          <GlobalOrderProvider>
            <Order />
          </GlobalOrderProvider>
        {/* </OrderLinesProvider> */}
      {/* </OrderProvider> */}
    </div>
  );
}
