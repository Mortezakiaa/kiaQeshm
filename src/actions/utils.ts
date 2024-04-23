"use server";
import axios from "axios";

export const getKalaTree = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/Kala/SearchTreeView`
    );
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};