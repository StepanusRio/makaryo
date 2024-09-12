"use client";
import { ViewIssueModal } from "@/components/modal/view-issue-modal";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { FC, useState } from "react";
import { TicketColumn } from "./columns";

interface ViewActionProps {
  data: TicketColumn;
}

export const ViewAction: FC<ViewActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ViewIssueModal
        data={data}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen(true)}>
        {" "}
        <Eye className="mr-2" /> <span>View Issue</span>
      </Button>
    </>
  );
};
