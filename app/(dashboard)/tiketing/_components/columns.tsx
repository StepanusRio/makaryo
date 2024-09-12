"use client";

import { Badge } from "@/components/ui/badge";
import { Clock12, TriangleAlert } from "lucide-react";
import { FC } from "react";

export type TicketColumn = {
  id: number;
  ticket_id: string;
  pc_informer: string;
  informer: string;
  issue: string;
  category: string;
  issue_type: string;
  done_by?: string;
  summary?: string;
  notes?: string;
  ticket_status?: string;
  issued_at?: string;
  responded_at?: string;
  completed_at?: string;
  start_at?: string;
  stop_at?: string;
};

interface TicketProps {
  data: TicketColumn;
}

export const TicketStatus: FC<TicketProps> = ({ data }) => {
  if (data.ticket_status === "Done") {
    return (
      <Badge className={`bg-green-700 w-2/3 h-8 hover:bg-green-700`}>
        {data.ticket_status}
      </Badge>
    );
  } else if (data.ticket_status === "Pending") {
    return (
      <Badge className={`hover:bg-destructive bg-destructive w-2/3 h-8`}>
        <Clock12 className="mr-3 w-4 h-4" /> {data.ticket_status}
      </Badge>
    );
  } else if (data.ticket_status === "Waiting") {
    return (
      <Badge className={`hover:bg-yellow-500 bg-yellow-500 w-2/3 h-8`}>
        <TriangleAlert className="mr-3 w-4 h-4" /> {data.ticket_status}
      </Badge>
    );
  }
  return <Badge className={`w-2/3 h-8`}>{data.ticket_status}</Badge>;
};
