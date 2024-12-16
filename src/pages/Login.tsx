import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginHandler } from "../app/api";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate: loginMutation } = useMutation({
    mutationFn: ({ username, password }: Inputs) =>
      LoginHandler(username, password),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginMutation({ username: data.username, password: data.password });
    navigate("/");
  };

  return (
    <div className="my-4">
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div className="my-2">
          <label htmlFor="InputUsername" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            defaultValue="Edmon"
            id="InputUsername"
            {...register("username", {
              required: true,
              minLength: 4,
              maxLength: 18,
            })}
          />
          {errors.username && <p className="text-danger fst-italic">Error</p>}
        </div>
        <div className="my-2">
          <label htmlFor="InputPassword" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            defaultValue="123123123"
            id="InputPassword"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="text-danger fst-italic">Error</p>}
        </div>
        <button
          type="submit"
          className="btn btn-secondary my-2"
          disabled={errors.password || errors.username ? true : false}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
