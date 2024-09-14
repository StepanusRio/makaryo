"use client";

import { TicketColumn } from "@/app/(dashboard)/tiketing/_components/columns";
import { FC } from "react";
import { Label } from "../ui/label";
import Modal from "../ui/modal";
import { Textarea } from "../ui/textarea";

interface ViewIssueModalProps {
  data: TicketColumn;
  isOpen: boolean;
  onClose: () => void;
}

export const ViewIssueModal: FC<ViewIssueModalProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  return (
    <Modal title="" description="" isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 gap-4">
        <Label className="font-bold">Issue</Label>
        <Textarea
          className="h-52 text-base text-black"
          value={data.issue}
          disabled
        />
        <Label>Notes</Label>
        <Textarea
          className="h-24 text-base text-black"
          value={data.notes || "No notes available"}
          disabled
        />
      </div>
    </Modal>
  );
};
