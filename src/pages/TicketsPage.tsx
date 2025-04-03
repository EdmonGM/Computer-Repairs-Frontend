import { GetAllTickets } from "../app/api";
import { useQuery } from "@tanstack/react-query";
import { ITicket } from "../app/types";
import TicketsTableRow from "../components/homepage/TicketsTableRow";

function TicketsPage() {
  const { data: tickets, isFetching } = useQuery<Array<ITicket>>({
    queryFn: GetAllTickets,
    queryKey: ["tickets"],
    staleTime: 60 * 1000, // stale after 1 minute
    refetchOnMount: "always",
  });

  console.log(tickets);

  if (isFetching) return <p>Loading...</p>;
  return (
    <>
      <h1>All Tickets</h1>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Is completed</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket: ITicket) => (
            <TicketsTableRow
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              isCompleted={ticket.isCompleted}
              children={<td>{ticket.userId}</td>}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TicketsPage;
