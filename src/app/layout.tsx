import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import Favicon from "./favicon.ico";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QueryProvider from "@/Provider/QueryProvider";

export const metadata: Metadata = {
  title: "گروه کیا قشم - Kiaqeshm Group",
  description: "Generated by amisa.me",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body>
        <AppRouterCacheProvider>
          <QueryProvider>{children}</QueryProvider>
          <ToastContainer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
