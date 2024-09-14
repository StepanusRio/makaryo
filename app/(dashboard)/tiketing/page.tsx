import { getAllCategory, getAllTicket, getEmployee } from "@/actions";
import { auth } from "@/auth";
import { EmployeeType } from "@/types";
import TicketClient from "./_components/client";
import { TicketColumn } from "./_components/columns";

async function TiketingPage() {
  const session = await auth();
  const data = await getAllTicket();
  const ticketUser = data.filter((ticket: TicketColumn) => {
    if (session?.user.Lvl !== "3") {
      return ticket.category === session?.user.Instansi;
    } else {
      return ticket.ticket_status === "Pembelian";
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

export default TiketingPage;
