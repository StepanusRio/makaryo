"use server";
import { signOut } from "@/auth";

export const logOut = async () => {
  await signOut();
  window.location.href = "/login";
};
