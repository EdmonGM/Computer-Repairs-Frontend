interface Props {
  id: string;
  body: string;
  color?: string;
}

function ProfileModalBtn({ id, body, color = "primary" }: Props) {
  return (
    <button
      type="button"
      className={`btn btn-${color}`}
      data-bs-toggle="modal"
      data-bs-target={"#" + id}
    >
      {body}
    </button>
  );
}

export default ProfileModalBtn;
