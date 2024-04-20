import { Metadata } from "next";
import Order from "@/forms/Order";

export const metadata: Metadata = {
  title: "ثبت سفارشات",
};

export default function page() {
  return (
    <div dir="rtl">
      <Order />
    </div>
  );
}
