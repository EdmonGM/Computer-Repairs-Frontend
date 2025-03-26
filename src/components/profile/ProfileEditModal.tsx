import { SubmitHandler, useForm } from "react-hook-form";

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
  password: string;
}
function ProfileEditModal({ id, label, title, user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="mb-3">
                <label htmlFor="PasswordInput" className="form-label">
                  Password
                </label>
                <input
                  id="PasswordInput"
                  className="form-control"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-danger">
                    Password is required to make changes!
                  </span>
                )}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-success">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditModal;
