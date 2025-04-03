import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../../app/api";
import UsersTableRow from "./UsersTableRow";

function UsersTable() {
  const {
    data: users,
    isSuccess,
    isFetching,
  } = useQuery({
    queryFn: GetAllUsers,
    queryKey: ["users"],
    staleTime: Infinity,
    refetchOnMount: "always",
  });

  if (isFetching) return <p>Loading...</p>;

  if (isSuccess)
    return (
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Tickets No.</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <UsersTableRow
              key={user.id}
              id={user.id}
              username={user.userName}
              name={user.name}
              email={user.email}
              role={user.role}
              salary={user.salary}
              ticketsNumber={user.tickets.length}
            />
          ))}
        </tbody>
      </table>
    );
}

export default UsersTable;
