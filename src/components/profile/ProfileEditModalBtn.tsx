interface Props {
  id: string;
  body: string;
}

function ProfileEditModalBtn({ id, body }: Props) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target={"#" + id}
    >
      {body}
    </button>
  );
}

export default ProfileEditModalBtn;
