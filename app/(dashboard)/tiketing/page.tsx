import { getAllCategory, getAllTicket } from "@/actions";
import { auth } from "@/auth";
import TicketClient from "./_components/client";
import { TicketColumn } from "./_components/columns";

async function TiketingPage() {
  const session = await auth();
  const data = await getAllTicket();
  const ticketUser = data.filter(
    (ticket: TicketColumn) => ticket.category === session?.user.Instansi
  );
  const category = await getAllCategory();
  return (
    <div className="flex flex-col">
      <TicketClient data={ticketUser} category={category} />
    </div>
  );
}

export default TiketingPage;
