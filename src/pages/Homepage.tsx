import { useUserStore } from "../app/store";
import TicketsTable from "../components/homepage/TicketsTable";
import { Link } from "react-router-dom";

export function HomePage() {
  const { username } = useUserStore();

  return (
    <>
      <section className="my-4">
        <h1>Welcome {username}!</h1>
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
