import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {

  const coockie = cookies().get('token')
  if(coockie){
    redirect('/')
  }else{
    redirect('/Login')
  }  
  return (
   <>
   
   </>
  );
}
