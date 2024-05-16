import { getCookie } from "@/actions/getCookie";
import MainLayout from "@/template/MainLayout";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isExistCookie = await getCookie();
  if (!isExistCookie) redirect("/Login");
  return <MainLayout>{children}</MainLayout>;
}
