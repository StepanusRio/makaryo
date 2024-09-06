import { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { getUserFromApi, getXToken } from "./lib/utils";

export default {
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const xToken = await getXToken();
        const user = await getUserFromApi(
          xToken,
          credentials.username as string,
          credentials.password as string
        );
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;