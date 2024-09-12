"use client";

import { TicketColumn } from "@/app/(dashboard)/tiketing/_components/columns";
import Modal from "@/components/ui/modal";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface EditTicketModalProps {
  data: TicketColumn;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTicketModal: FC<EditTicketModalProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      title="Detail Issue"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Separator className="mb-3" />
      <div className="grid grid-cols-2 gap-x-10 gap-y-3">
        <div className="grid gap-3">
          <Label className="text-base font-bold">Ticket Id</Label>
          <Input value={data.ticket_id} disabled />
        </div>
        <div className="grid gap-3">
          <Label className="text-base font-bold">Informer</Label>
          <Input value={data.informer} disabled />
        </div>
        <div className="grid col-span-2">
          <Label className="text-base font-bold">Issue</Label>
          <Textarea value={data.informer} disabled />
        </div>
      </div>
    </Modal>
  );
};
