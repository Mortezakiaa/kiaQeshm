import Login from "@/forms/Login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function page() {
  const coockie = cookies().get('token')
  if(coockie)redirect('/Order')
  
  return (
    <>
     <Login/>
    </>
  )
}
