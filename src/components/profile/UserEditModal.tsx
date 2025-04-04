import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UpdateUserById } from "../../app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdateUser, IUser } from "../../app/types";
import InputField from "../InputField";

interface Props {
  id: string;
  label: string;
  title: string;
  user: IUser;
}

interface Inputs extends IUpdateUser {
  changingPassword: boolean;
}

function UserEditModal({ id, label, title, user }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: UpdateUserById,
    mutationKey: ["users"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const methods = useForm<Inputs>();
  const { handleSubmit, getValues, register, watch } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data: IUpdateUser) => {
    if (!getValues("changingPassword")) data.password = "";
    await mutateAsync({ id: user.id, user: data });
  };

  watch("changingPassword");

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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id={label}>
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <InputField<Inputs>
                name="username"
                label="Username"
                placeholder="Enter Username"
                defaultValue={user?.userName}
                rules={{
                  required: { value: true, message: "Username is required" },
                  minLength: {
                    value: 4,
                    message: "Username should not be less than 4 letters",
                  },
                  maxLength: {
                    value: 18,
                    message: "Username should not be more than 18 letters",
                  },
                }}
              />
              <InputField<Inputs>
                name="email"
                label="Email Address"
                placeholder="name@example.com"
                type="email"
                defaultValue={user?.email}
                rules={{
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                }}
              />
              <InputField<Inputs>
                name="name"
                label="Name"
                placeholder="Your Name"
                defaultValue={user?.name}
              />
              <InputField<Inputs>
                name="salary"
                label="Salary"
                type="number"
                defaultValue={user?.salary}
                rules={{
                  min: {
                    value: 0,
                    message: "Salary Should be higher than 0$",
                  },
                  max: {
                    value: 999999,
                    message: "Salary Should be less than 999999$",
                  },
                }}
              />
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
                <InputField<Inputs>
                  name="password"
                  label="Password"
                  type="password"
                  rules={{
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password should not be less than 8 letters",
                    },
                    maxLength: {
                      value: 32,
                      message: "Password should not be more than 32 letters",
                    },
                  }}
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <input
                type="submit"
                className="btn btn-success"
                data-bs-dismiss="modal"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default UserEditModal;
