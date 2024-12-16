import { useEffect } from "react";
import useStore from "../app/store";
import TicketsTable from "../components/homepage/TicketsTable";

export function HomePage() {
  const { username, decodeToken } = useStore();
  useEffect(decodeToken, []);

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
        <button className="btn btn-success">Create Ticket</button>
      </section>
    </>
  );
}
