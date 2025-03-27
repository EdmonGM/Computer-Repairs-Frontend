import { SubmitHandler, useForm } from "react-hook-form";
import { IUpdateUser } from "../../app/types";
import { UpdateCurrentUser } from "../../app/api";

interface Props {
  id: string;
  label: string;
  title: string;
  user: {
    name: string;
    email: string;
  };
}
interface Inputs {
  email: string;
  name: string;
  changingPassword: boolean;
  currentPassword: string;
  newPassword: string;
}
function ProfileEditModal({ id, label, title, user }: Props) {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: IUpdateUser) =>
    UpdateCurrentUser({ ...data });

  watch("changingPassword");

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={label}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <form onSubmit={handleSubmit(onSubmit)} className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={label}>
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="EmailInput" className="form-label">
                Email Address
              </label>
              <input
                id="EmailInput"
                placeholder="name@example.com"
                className="form-control"
                type="email"
                defaultValue={user.email}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-danger">This field is required!</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="NameInput" className="form-label">
                Name
              </label>
              <input
                id="NameInput"
                placeholder="Your Name"
                className="form-control"
                defaultValue={user.name}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-danger">This field is required!</span>
              )}
            </div>
            <div className="mb-3 form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                {...register("changingPassword")}
              />
              <label
                className="form-check-label ms-1"
                htmlFor="flexSwitchCheckDefault"
              >
                Change Password?
              </label>
            </div>
            {getValues("changingPassword") && (
              <div>
                <div className="mb-3">
                  <label htmlFor="CurrentPasswordInput" className="form-label">
                    Current Password
                  </label>
                  <input
                    id="CurrentPasswordInput"
                    className="form-control"
                    type="password"
                    {...register("currentPassword", {
                      required: getValues("changingPassword"),
                    })}
                  />
                  {errors.currentPassword && (
                    <span className="text-danger">
                      Please enter current password!
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="NewPasswordInput" className="form-label">
                    New Password
                  </label>
                  <input
                    id="NewPasswordInput"
                    className="form-control"
                    type="password"
                    {...register("newPassword", {
                      required: getValues("changingPassword"),
                    })}
                  />
                  {errors.newPassword && (
                    <span className="text-danger">
                      Please enter new password!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <input type="submit" className="btn btn-success" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditModal;
