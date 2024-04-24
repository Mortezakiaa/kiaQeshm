import { getCookie } from "@/actions/getCookie";
import Login from "@/forms/Login";
import { redirect } from "next/navigation";

export default async function page() {
  const isExistCookie = await getCookie()
  if(isExistCookie)redirect('/Order')
  
  return (
    <>
     <Login/>
    </>
  )
}
