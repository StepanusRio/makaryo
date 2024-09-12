"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";

import { FC } from "react";
import { BiExit } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import LogoutButton from "./logout-button";

interface UserButtonProps {}

const UserButton: FC<UserButtonProps> = ({}) => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3">
        <p className="md:text-sm md:block hidden">{user?.Nama}</p>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {/* Log out Button */}
        <LogoutButton>
          <DropdownMenuItem>
            <BiExit className="h-4 w-4 mr-2" /> Log out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
