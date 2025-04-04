import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUser } from "../../app/api";
import { ICreateUser } from "../../app/types";

function CreateUserPage() {
  const methods = useForm<ICreateUser>();
  const { handleSubmit, register } = methods;

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: CreateUser,
    mutationKey: ["users"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const createUserHandler: SubmitHandler<ICreateUser> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <section className="my-4">
      <h1>Create New User</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(createUserHandler)}>
          <div className="row">
            <InputField<ICreateUser>
              name="username"
              label="Username"
              placeholder="Enter Username"
              className="col"
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
            <InputField<ICreateUser>
              name="email"
              label="Email"
              placeholder="Enter Email"
              type="email"
              className="col"
              rules={{
                required: {
                  value: true,
                  message: "Email is required",
                },
              }}
            />
          </div>
          <div className="row">
            <InputField<ICreateUser>
              name="name"
              label="Name"
              placeholder="Enter Name"
              className="col"
            />
            <InputField<ICreateUser>
              name="password"
              label="Password"
              placeholder="Enter Password"
              type="password"
              className="col"
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
          <div className="row">
            <InputField<ICreateUser>
              name="salary"
              label="Salary"
              placeholder="Enter Salary"
              type="number"
              className="col"
              defaultValue={0}
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
            <div className="mb-3 col">
              <div>
                <label htmlFor="Role" className="form-label">
                  Role:
                </label>
                <select {...register("role")} className="form-select" id="Role">
                  <option value="Employee">Employee</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
          <button className="btn btn-success" type="submit">
            Create
          </button>
        </form>
      </FormProvider>
    </section>
  );
}

export default CreateUserPage;
