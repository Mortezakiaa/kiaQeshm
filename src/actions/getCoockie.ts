"use server";

import { cookies } from "next/headers";

const getCoockie = async () => {
  const cook = cookies();
  const isExist = cook.get("token");
  if (isExist) return true;
  else return false;
};

export { getCoockie };
