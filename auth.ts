import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
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
        token.ID = user.ID;
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
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
