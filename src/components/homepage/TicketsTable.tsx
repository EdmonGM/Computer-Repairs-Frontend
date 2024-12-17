import { useQuery } from "@tanstack/react-query";
import TicketsTableRow from "./TicketsTableRow";
import { GetCurrentUserTickets } from "../../app/api";
import { ITicket } from "../../app/types";

function TicketsTable() {
  const { data: tickets, isFetching } = useQuery<Array<ITicket>>({
    queryFn: GetCurrentUserTickets,
    queryKey: ["tickets"],
  });

  if (isFetching) return <p>Loading...</p>;

  if (tickets) {
    return (
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Is completed</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket: ITicket) => (
            <TicketsTableRow
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              isCompleted={ticket.isCompleted}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default TicketsTable;
