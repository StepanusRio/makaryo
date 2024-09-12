"use client";

import { logOut } from "@/actions/logout";
import React, { FC } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton: FC<LogoutButtonProps> = ({ children }) => {
  const onClick = async () => {
    await logOut();
  };
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};

export default LogoutButton;
