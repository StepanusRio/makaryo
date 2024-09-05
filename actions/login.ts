"use server";

import { signIn } from "@/auth";

export async function loginAction(username: string, password: string) {
  const response = await signIn("credentials", {
    username,
    password,
  });
  if (response) {
    return {
      message: "Sign in success",
    };
  } else {
    return {
      message: "Sign in failed",
    };
  }
}
