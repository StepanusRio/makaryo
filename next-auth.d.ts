import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  ID?: string;
  UName?: string;
  Nama?: string;
  Instansi?: string;
  Bagian?: string;
  Profesi?: string;
  Lvl?: string;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
  interface User {
    ID?: string;
    UName?: string;
    Nama?: string;
    Instansi?: string;
    Bagian?: string;
    Profesi?: string;
    Lvl?: string;
  }
}
