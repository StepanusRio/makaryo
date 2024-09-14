"use client";
import { NewTicketModal } from "@/components/modal/new-ticket-modal";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useCurrentLevel } from "@/hooks/use-current-level";
import { useCurrentRole } from "@/hooks/use-current-role";
import { EmployeeType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { TicketColumn, TicketStatus } from "../../../_components/columns";
import { ViewAction } from "../../../_components/view-action";

export type CategoryType = {
  id: number;
  kategori: string;
  subkategori: string;
};

interface TicketClientProps {
  data: TicketColumn[];
  category: CategoryType[];
  employe: EmployeeType[];
}
function TicketClient({ data, category }: TicketClientProps) {
  const [open, setOpen] = useState(false);
  const level = useCurrentLevel();
  const role = useCurrentRole();

  const columns = useMemo<ColumnDef<TicketColumn>[]>(() => {
    let baseColumns: ColumnDef<TicketColumn>[] = [
      {
        accessorKey: "ticket_id",
        header: "Ticket ID",
      },
      {
        id: "pc_informer",
        accessorKey: "pc_informer",
        header: "Pc Informer",
      },
      {
        id: "informer",
        accessorKey: "informer",
        header: "Informer",
      },
      {
        accessorKey: "issue",
        header: "Issue",
        cell: ({ row }) => <ViewAction data={row.original} />,
      },
      {
        accessorKey: "summary",
        header: "Summary",
      },
      {
        accessorKey: "ticket_status",
        header: "Ticket Status",
        cell: ({ row }) => <TicketStatus data={row.original} />,
      },
    ];

    if (role === "7") {
      baseColumns.splice(4, 0, {
        accessorKey: "issue_type",
        header: "Issue Type",
      });
    }

    if (level === "3") {
      baseColumns = baseColumns.filter(
        (column) => column.id !== "pc_informer" && column.id !== "informer"
      );
    }

    return baseColumns;
  }, [role, level]);

  return (
    <>
      <NewTicketModal
        category={category}
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={false}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {level === "3" ? "Kelola Pembelian" : "Kelola Ticket"}
        </h1>
        {level === "3" ? null : (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Buat Tiket Baru
          </button>
        )}
      </div>
      <Separator className="mt-5" />
      <DataTable columns={columns} data={data} searchKey="ticket_id" />
    </>
  );
}

export default TicketClient;
