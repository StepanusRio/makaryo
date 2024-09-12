"use client";
import { SIDEBAR_ROUTES } from "@/types";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useState } from "react";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const routes = SIDEBAR_ROUTES;
  const [open, setOpen] = useState(true);
  const pathName = usePathname();
  return (
    <div
      className={`pb-12 min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 px-4`}
    >
      {open ? (
        <div className="py-3 flex justify-between">
          <div>
            <h2
              style={{
                transitionDelay: `500ms`,
              }}
              className={`font-semibold duration-500 transition-all whitespace-pre ${
                !open && "opacity-0 translate-x-80 overflow-hidden"
              }`}
            >
              Makaryo
            </h2>
          </div>
          <X
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
      ) : (
        <div className="py-3 flex justify-end">
          <Menu
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
      )}
      <div className="space-y-4 py-4 relative">
        {routes.map((route, i) => (
          <div key={i}>
            <div
              className={`group border text-center border-border flex items-center text-sm gap-3.5 font-medium p-2 rounded-md transition-all`}
            >
              <div className={`${open ? "ml-0" : "ml-[-2.3px]"}`}>
                {React.createElement(route.headIcon, { size: "20" })}
              </div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`font-semibold whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {route.head}
              </h2>
            </div>
            <div className="relative">
              {route.links.map((item, j) => (
                <Link
                  key={`${i}-${j}`}
                  className={`group my-1 hover:bg-slate-200 flex items-center text-sm gap-3.5 font-medium p-2 transition-all rounded-md ${
                    pathName.startsWith(item.href) ? "bg-slate-200" : ""
                  } ${open ? "ml-3" : "ml-0"}`}
                  href={item.href}
                >
                  <div>
                    {React.createElement(item.linksIcon, { size: "17" })}
                  </div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open &&
                      "opacity-0 translate-x-28 border-green-700 overflow-hidden"
                    }`}
                  >
                    {item.linksLabel}
                  </h2>
                  <h2
                    className={`${
                      open && "hidden"
                    } absolute bg-slate-300 left-48 whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                  >
                    {item.linksLabel}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
