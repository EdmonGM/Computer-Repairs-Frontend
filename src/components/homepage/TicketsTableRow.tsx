interface Props {
  id: string;
  title: string;
  isCompleted: boolean;
}
function TicketsTableRow({ id, title, isCompleted }: Props) {
  return (
    <tr className="cursor-pointer">
      <td>{id}</td>
      <td>{title}</td>
      <td>{isCompleted ? "True" : "False"}</td>
    </tr>
  );
}

export default TicketsTableRow;
