import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromApi, getXToken } from "./lib/utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
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
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.ID = token.ID as string;
        session.user.UName = token.UName as string;
        session.user.Nama = token.Nama as string;
        session.user.Instansi = token.Instansi as string;
        session.user.Bagian = token.Bagian as string;
        session.user.Profesi = token.Profesi as string;
        session.user.Lvl = token.Lvl as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.ID;
        token.UName = user.UName;
        token.Nama = user.Nama;
        token.Instansi = user.Instansi;
        token.Bagian = user.Bagian;
        token.Profesi = user.Profesi;
        token.Lvl = user.Lvl;
      }
      return token;
    },
  },
});
