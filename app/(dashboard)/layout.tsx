import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="border-t">
      <div className="bg-background">
        <div className="flex flex-row">
          <Sidebar />
          <div className="col-span-3 overflow-auto lg:col-span-5 lg:border-l w-full">
            <div className="px-6 py-6 lg:px-8">
              <Header />
              <div>{children}</div>
              <Toaster />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
