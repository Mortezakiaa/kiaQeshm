'use server'
import { cookies } from 'next/headers'
import { UserLogin } from "@/Types/Types";
import axios from "axios";
import { revalidatePath } from 'next/cache';

const Auth = async (Data:UserLogin) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Auth/Login`,
      Data
    );
    const cookiesList = cookies()
    const data = res.data;
    cookiesList.set({
        name:'token',
        value:data.data.accessToken,
        httpOnly:true
    })
    revalidatePath('/Login')
    return true
  } catch (error) {
    return false
  }
};

export { Auth }