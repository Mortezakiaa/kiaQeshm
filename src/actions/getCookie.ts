"use server";

import { cookies } from "next/headers";

const getCookie = async () => {
  const cook = cookies();
  const isExist = cook.get("token");
  if (isExist) return true;
  else return false;
};

export { getCookie };
