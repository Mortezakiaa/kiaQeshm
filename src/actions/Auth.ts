"use server";
import { cookies } from "next/headers";
import { UserLogin } from "@/Types/Types";
import axios from "axios";
import { revalidatePath } from "next/cache";

const Auth = async (Data: UserLogin) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Auth/Login`,
    Data
  );
  const data = res.data;

  if (data.isSuccess) {
    const cookiesList = cookies();
    cookiesList.set({
      name: "token",
      value: data.data.accessToken,
      httpOnly: true,
    });
    revalidatePath("/Login");
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
