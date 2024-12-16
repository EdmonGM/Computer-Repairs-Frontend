interface Props {
  title: string;
  value: string | number;
}

function ProfileListItem({ title, value }: Props) {
  return (
    <li className="list-group-item fw-bold">
      {title}:<span className="text-secondary">{" " + value}</span>
    </li>
  );
}

export default ProfileListItem;
