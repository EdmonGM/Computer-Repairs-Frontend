import { useQuery } from "@tanstack/react-query";
import useStore from "../app/store";
import TicketsTable from "../components/homepage/TicketsTable";
import { Link } from "react-router-dom";
import { GetCurrentUser } from "../app/api";
import { useEffect } from "react";

export function HomePage() {
  const { setData, username } = useStore();
  const {
    data: user,
    isSuccess,
    isFetching,
  } = useQuery({
    queryFn: GetCurrentUser,
    queryKey: ["users"],
  });
  useEffect(() => {
    if (isSuccess) setData(user.userName, user.email, user.id);
  }, [isSuccess]);

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
