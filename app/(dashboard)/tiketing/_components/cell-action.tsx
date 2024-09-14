"use client";

import { updateStatusAction } from "@/actions";
import { AddNoteModal } from "@/components/modal/add-note-ticket-modal";
import { DelegasiModal } from "@/components/modal/delegasi-modal";
import { EditTicketModal } from "@/components/modal/edit-ticket-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { EmployeeType } from "@/types";
import { GearIcon } from "@radix-ui/react-icons";
import { CheckCircle, ListCollapse, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiPurchaseTag, BiTransfer } from "react-icons/bi";
import { CategoryType } from "./client";
import { TicketColumn } from "./columns";

interface CellActionProps {
  data: TicketColumn;
  category?: CategoryType[];
  employe?: EmployeeType[];
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  category,
  employe,
}) => {
  const [openSelesai, setOpenSelesai] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openDelegasi, setOpenDelegasi] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();
  const pembelianStatus = async (ticket_id: string, status: string) => {
    try {
      await updateStatusAction(ticket_id, status);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <EditTicketModal
        employe={employe}
        data={data}
        isOpen={openSelesai}
        onClose={() => setOpenSelesai(false)}
      />
      <AddNoteModal
        data={data}
        isOpen={openNote}
        status={status}
        onClose={() => setOpenNote(false)}
      />
      <DelegasiModal
        data={data}
        isOpen={openDelegasi}
        onClose={() => setOpenDelegasi(false)}
        category={category || []}
      />
      {/* If data.ticket_status === Waiting Show DropdownMenu With Action to Proccess Staus */}
      {data.ticket_status === "Pending" ? (
        <div className="flex gap-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setOpenSelesai(true);
                }}
              >
                <GearIcon className="mr-2 h-4 w-4" />
                Selesai
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenNote(true);
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Edit Note
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem
                onClick={() => {
                  pembelianStatus(data.ticket_id, "Pembelian");
                }}
              >
                <BiPurchaseTag className="mr-2 h-4 w-4" />
                Pembelian
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          {data.ticket_status === "Waiting" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    setStatus("Proccess");
                    setOpenNote(true);
                  }}
                >
                  <GearIcon className="mr-2 h-4 w-4" />
                  Proccess
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setStatus("Void");
                    setOpenNote(true);
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Void
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setOpenDelegasi(true);
                  }}
                >
                  <BiTransfer className="mr-2 h-4 w-4" />
                  Delegasi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    setOpenSelesai(true);
                  }}
                >
                  <ListCollapse className="mr-2 h-4 w-4" />
                  Lihat Detail
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      )}
    </>
  );
};
