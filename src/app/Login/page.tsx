import { getCookie } from "@/actions/getCookie";
import Login from "@/forms/Login";
import { redirect } from "next/navigation";

export default async function Page() {
  const isExistCookie = await getCookie()
  if(isExistCookie)redirect('/Order')
  
  return (
    <>
     <Login/>
    </>
  )
}
