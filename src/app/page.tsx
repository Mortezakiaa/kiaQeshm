import { getCookie } from "@/actions/getCookie";
import { redirect } from "next/navigation";

export default function Home() {
  const cookie = getCookie()
  if(!cookie) redirect('/Login')
  else redirect('/Order')
}
