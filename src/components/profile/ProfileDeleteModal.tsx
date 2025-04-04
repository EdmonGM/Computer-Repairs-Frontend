import { useMutation } from "@tanstack/react-query";
import { DeleteUserById } from "../../app/api";
import { useNavigate, useParams } from "react-router-dom";

function ProfileDeleteModal({ id, label }: { id: string; label: string }) {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { mutateAsync } = useMutation({
    mutationFn: DeleteUserById,
    mutationKey: ["users"],
    onSuccess: () => navigate(-1),
  });

  if (!userId) return;

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={label}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={label}>
              Delete User?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
            <p className="text-danger">
              <em>Deleting a User CANNOT be undone</em>
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => mutateAsync(userId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDeleteModal;
