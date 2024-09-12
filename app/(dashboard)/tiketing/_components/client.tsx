"use client";
import { NewTicketModal } from "@/components/modal/new-ticket-modal";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { CellAction } from "./cell-action";
import { TicketColumn, TicketStatus } from "./columns";
import { ViewAction } from "./view-action";

export type CategoryType = {
  id: number;
  kategori: string;
  subkategori: string;
};

interface TicketClientProps {
  data: TicketColumn[];
  category: CategoryType[];
}
function TicketClient({ data, category }: TicketClientProps) {
  const [open, setOpen] = useState(false);
  const role = useCurrentRole();

  const columns = useMemo<ColumnDef<TicketColumn>[]>(() => {
    const baseColumns: ColumnDef<TicketColumn>[] = [
      {
        accessorKey: "ticket_id",
        header: "Ticket ID",
      },
      {
        accessorKey: "pc_informer",
        header: "Pc Informer",
      },
      {
        accessorKey: "informer",
        header: "Informer",
      },
      {
        accessorKey: "issue",
        header: "Issue",
        cell: ({ row }) => <ViewAction data={row.original} />,
      },
      {
        accessorKey: "ticket_status",
        header: "Ticket Status",
        cell: ({ row }) => <TicketStatus data={row.original} />,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <CellAction data={row.original} category={category} />
        ),
      },
    ];

    if (role === "7") {
      baseColumns.splice(4, 0, {
        accessorKey: "issue_type",
        header: "Issue Type",
      });
    }
    return baseColumns;
  }, [role, category]);

  return (
    <>
      <NewTicketModal
        category={category}
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={false}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Ticket</h1>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Buat Tiket Baru
        </button>
      </div>
      <Separator className="mt-5" />
      <DataTable columns={columns} data={data} searchKey="ticket_id" />
    </>
  );
}

export default TicketClient;
