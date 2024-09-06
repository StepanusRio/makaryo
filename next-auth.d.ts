import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  ID: string | undefined;
  UName: string | undefined;
  Nama: string | undefined;
  Instansi: string | undefined;
  Bagian: string | undefined;
  Profesi: string | undefined;
  Lvl: string | undefined;
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
