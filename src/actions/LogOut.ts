"use server";

import { cookies } from "next/headers";

const LogOut = async () => {
  cookies().delete("token");
};
export { LogOut };
