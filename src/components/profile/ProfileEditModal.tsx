import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IUpdateCurrentUser } from "../../app/types";
import { UpdateCurrentUser } from "../../app/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../app/store";
import InputField from "../InputField";

interface Props {
  id: string;
  label: string;
  title: string;
}
interface Inputs extends IUpdateCurrentUser {
  changingPassword: boolean;
}

function ProfileEditModal({ id, label, title }: Props) {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: UpdateCurrentUser,
    mutationKey: ["users"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const methods = useForm<Inputs>();
  const { handleSubmit, getValues, register, watch } = methods;

  const onSubmit: SubmitHandler<Inputs> = async (data: IUpdateCurrentUser) => {
    if (!getValues("changingPassword")) {
      data.currentPassword = "";
      data.newPassword = "";
    }
    await mutateAsync({ ...data });
  };

  const { name, email } = useUserStore();

  watch("changingPassword"); // Rerenders the component when the value is changed

  return (
    <div className="modal fade" id={id} tabIndex={-1} aria-labelledby={label}>
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
                name="email"
                label="Email Address"
                placeholder="name@example.com"
                type="email"
                defaultValue={email}
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
                defaultValue={name}
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
                <div>
                  <InputField<Inputs>
                    name="currentPassword"
                    label="Current Password"
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
                  <InputField<Inputs>
                    name="newPassword"
                    label="New Password"
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

export default ProfileEditModal;
