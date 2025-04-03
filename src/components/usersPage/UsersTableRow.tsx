import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  ticketsNumber: number;
}

function UsersTableRow(data: Props) {
  const navigate = useNavigate();
  return (
    <tr
      className="cursor-pointer"
      onClick={() => navigate(`/users/${data.id}`)}
    >
      <td>{data.username}</td>
      <td>{data.name ?? "NULL"}</td>
      <td>{data.email}</td>
      <td>{data.role}</td>
      <td>{data.salary}$</td>
      <td>{data.ticketsNumber}</td>
    </tr>
  );
}

export default UsersTableRow;
