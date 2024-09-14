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
  "Unspecified",
  "Peripheral",
  "MedinFras",
  "Hardware",
  "Aplikasi Non Medin",
  "Network",
  "Printer",
  "CCTV",
];

export type EmployeeType = {
  ID: string;
  NAMA: string;
  NAMA_KTP: string;
  DIREKTORAT: string;
  BAGIAN: string;
  JABATAN: string;
  PROFESI: string;
  NO_KTP: string;
  ALAMAT: string;
  KELURAHAN: string;
  KECAMATAN: string;
  KOTA: string;
  PROVINSI: string;
  STATUS_PERKAWINAN: string;
  NO_HP: string;
  EMAIL: string;
  TEMPAT_LAHIR: string;
  TANGGAL_LAHIR: string;
  JENIS_KELAMIN: string;
  AGAMA: string;
  GOLONGAN_DARAH: string;
  NO_NPWP: string;
  NO_BPJS_TK: string;
  NO_BPJS_KS: string;
  TGL_SK: string;
  MAKARYO_PWD: string;
  MAKARYO_BAGIAN: string;
  MAKARYO_LVL: string;
  id: string;
};
