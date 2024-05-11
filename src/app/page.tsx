import { getCookie } from "@/actions/getCookie";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookie = await getCookie()
  if(!cookie) redirect('/Login')
  else redirect('/Order')
}
