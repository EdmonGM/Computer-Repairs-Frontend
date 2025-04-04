import { Link } from "react-router-dom";
import UsersTable from "../components/usersPage/UsersTable";

function UsersPage() {
  return (
    <>
      <section className="my-4">
        <h1>Users Page</h1>
      </section>
      <section>
        <UsersTable />
        <Link to="new" className="btn btn-success">
          Create User
        </Link>
      </section>
    </>
  );
}

export default UsersPage;
