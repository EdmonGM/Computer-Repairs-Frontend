import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginHandler } from "../app/api";
import InputField from "../components/InputField";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const methods = useForm<Inputs>({
    defaultValues: {
      username: "admin",
      password: "123123123",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: ({ username, password }: Inputs) =>
      LoginHandler(username, password),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["current_user"] }),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await loginMutation({ username: data.username, password: data.password });
    navigate("/");
  };

  return (
    <div className="container my-5">
      <div className="my-4">
        <h3>Login</h3>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="my-4">
            <InputField<Inputs>
              name="username"
              label="Username"
              placeholder="Enter Your Username"
              defaultValue="admin"
              rules={{
                required: { value: true, message: "This field is required!" },
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
            <InputField
              name="password"
              type="password"
              label="Password"
              placeholder="Enter Your Password"
              defaultValue="123123123"
              rules={{
                required: {
                  value: true,
                  message: "Password should not be less than 8 letters",
                },
              }}
            />
            <button
              type="submit"
              className="btn btn-secondary my-2"
              disabled={errors.password || errors.username ? true : false}
            >
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
