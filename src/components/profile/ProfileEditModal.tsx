import { SubmitHandler, useForm } from "react-hook-form";
import { IUpdateUser } from "../../app/types";
import { UpdateCurrentUser } from "../../app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useStore from "../../app/store";

interface Props {
  id: string;
  label: string;
  title: string;
}
interface Inputs {
  email: string;
  name: string;
  changingPassword: boolean;
  currentPassword: string;
  newPassword: string;
}

function ProfileEditModal({ id, label, title }: Props) {
  const queryClient = useQueryClient();
  const {
    mutateAsync,
    isSuccess: isEditSuccess,
    isError: isEditError,
  } = useMutation({
    mutationFn: UpdateCurrentUser,
    mutationKey: ["users"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: IUpdateUser) => {
    await mutateAsync({ ...data });
  };

  const { name, email } = useStore();

  watch("changingPassword");

  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={label}>
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
                defaultValue={email}
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
                defaultValue={name}
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
          {isEditSuccess && (
            <div
              className="alert alert-success mx-3 d-flex align-items-center gap-1"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <div>Edit Successful!</div>
            </div>
          )}
          {isEditError && (
            <div
              className="alert alert-danger mx-3 d-flex align-items-center gap-1"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg>
              <div>Edit Not Successful!</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileEditModal;
