import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  isCompleted: boolean;
}
function TicketsTableRow({ id, title, isCompleted }: Props) {
  const navigate = useNavigate();
  return (
    <tr className="cursor-pointer" onClick={() => navigate(`/tickets/${id}`)}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{isCompleted ? "True" : "False"}</td>
    </tr>
  );
}

export default TicketsTableRow;
