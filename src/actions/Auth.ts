"use server";
import { cookies } from "next/headers";
import { UserLogin } from "@/Types/Types";
import ApiService from "@/utils/axios";

const Auth = async (Data: UserLogin) => {
  const data = await ApiService.post('Auth/Login' , Data)
  if (data.isSuccess) {
    const cookiesList = cookies();
    cookiesList.set({
      name: "token",
      value: data.data.accessToken,
      httpOnly: true,
    });
    return {
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      isSuccess: true,
    };
  } else {
    return { isSuccess: false, messageRoot: data.messageRoot };
  }
};

export { Auth };
