import { getCoockie } from "@/actions/getCoockie";
import { redirect } from "next/navigation";

export default function Home() {
  const cookie = getCoockie()
  if(!cookie) redirect('/Login')
  redirect('/Order')
}
