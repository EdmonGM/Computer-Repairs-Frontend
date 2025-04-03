import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  isCompleted: boolean;
  children?: ReactNode;
}
function TicketsTableRow({ id, title, isCompleted, children }: Props) {
  const navigate = useNavigate();
  return (
    <tr className="cursor-pointer" onClick={() => navigate(`/tickets/${id}`)}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{isCompleted ? "True" : "False"}</td>
      {children}
    </tr>
  );
}

export default TicketsTableRow;
