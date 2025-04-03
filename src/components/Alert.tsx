import { useFetchStore } from "../app/store";

function Alert({ color = "danger" }: { color?: string }) {
  const { message, clearMessage } = useFetchStore();

  if (!message) return;

  return (
    <div
      className={`alert alert-${color} alert-dismissible fade show position-absolute bottom-0 end-0 mx-2`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={() => clearMessage()}
      ></button>
    </div>
  );
}

export default Alert;
