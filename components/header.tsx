import UserButton from "@/components/auth/user-button";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="py-3 mb-8 border-b border-border flex flex-row items-center justify-end">
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
