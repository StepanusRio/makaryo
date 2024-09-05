import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      {/* Navbar */}
      <div>Navbar</div>
      {/* Sidebar */}
      <div>Sidebar</div>
      {/* Content */}
      <div>{children}</div>
      {/* Footer */}
      <div>Footer</div>
    </div>
  );
}
