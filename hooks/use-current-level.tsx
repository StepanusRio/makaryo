import { useSession } from "next-auth/react";

export const useCurrentLevel = () => {
  const session = useSession();
  return session.data?.user.Lvl;
};
