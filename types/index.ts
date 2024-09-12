import { FaGear, FaTicket } from "react-icons/fa6";
import { GrDashboard } from "react-icons/gr";

export const SIDEBAR_ROUTES = [
  {
    head: "Makaryo Dashboard",
    headIcon: GrDashboard,
    links: [
      {
        linksLabel: "Dashboard",
        linksIcon: FaGear,
        href: "/dashboard",
      },
      {
        linksLabel: "Tiketing",
        linksIcon: FaTicket,
        href: "/tiketing",
      },
    ],
  },
];

export const ISSUE_TYPE = [
  "Peripheral",
  "MedinFras",
  "Hardware",
  "Aplikasi Non Medin",
  "Network",
  "Printer",
  "CCTV",
];
