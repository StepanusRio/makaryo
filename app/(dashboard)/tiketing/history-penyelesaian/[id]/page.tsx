import { getAllCategory, getAllTicket, getEmployee } from "@/actions";
import { auth } from "@/auth";
import { EmployeeType } from "@/types";
import { TicketColumn } from "../../_components/columns";
import TicketClient from "./_components/client";

interface HistoryPenyelesaianPageProps {
  params: {
    id: string;
  };
}

async function HistoryPenyelesaianPage({
  params,
}: HistoryPenyelesaianPageProps) {
  const session = await auth();
  const data = await getAllTicket();
  const ticketUser = data.filter((ticket: TicketColumn) => {
    if (session?.user.ID === params.id) {
      return (
        ticket.done_by === session?.user.ID && ticket.ticket_status === "Done"
      );
    }
  });
  const role = session?.user.Instansi;
  const category = await getAllCategory();
  const employe: EmployeeType[] = await getEmployee(role as string);
  return (
    <div className="flex flex-col">
      <TicketClient data={ticketUser} employe={employe} category={category} />
    </div>
  );
}

export default HistoryPenyelesaianPage;
