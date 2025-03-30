import TicketsTable from "../components/homepage/TicketsTable";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  isFetching: boolean;
}
export function HomePage({ username, isFetching }: Props) {
  return (
    <>
      <section className="my-4">
        {isFetching ? <h1>Welcome</h1> : <h1>Welcome {username}!</h1>}
        <p>{new Date().toLocaleString().slice(0, -3)}</p>
      </section>
      <hr />
      <section className="my-4">
        <h3>Your Tickets</h3>
        <TicketsTable />
        <Link to="/tickets/new" className="btn btn-success">
          Create Ticket
        </Link>
      </section>
    </>
  );
}
