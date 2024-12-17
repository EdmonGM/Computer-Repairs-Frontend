import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateTicket } from "../../app/types";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CreateTicket } from "../../app/api";

function CreateTicketForm() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ICreateTicket>();

  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: CreateTicket,
    mutationKey: ["tickets"],
  });

  const [descriptionLength, setDescriptionLength] = useState(
    getValues("description")?.length
  );

  const createTicketHandler: SubmitHandler<ICreateTicket> = async (
    data: any
  ) => {
    Object.keys(data).forEach((item) => {
      if (typeof data[item] == "string") {
        data[item] = data[item].trim();
      }
    });
    await mutateAsync({
      title: data.title,
      description: data.description,
      isCompleted: data.isCompleted,
    });
  };
  const btnStyle: React.CSSProperties = {
    width: "72px",
  };

  useEffect(() => {
    setDescriptionLength(getValues("description")?.length);
  }, [watch("description")]);

  return (
    <form onSubmit={handleSubmit(createTicketHandler)}>
      <div className="my-2">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          id="title"
          className="form-control"
          {...register("title", { required: true, maxLength: 50 })}
        />
        {errors.title && (
          <p className="form-text text-danger">{errors.title.message}</p>
        )}
      </div>
      <div className="my-2">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          id="description"
          className="form-control"
          {...register("description", { maxLength: 300 })}
        />
        {typeof descriptionLength == "number" && (
          <p
            className={`form-text mb-0 ${
              descriptionLength > 300 ? "text-danger" : ""
            }`}
          >
            {descriptionLength} / 300
          </p>
        )}
        {errors.description && (
          <p className="form-text text-danger">
            Description should be less than 300 letters
          </p>
        )}
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          id="isCompleted"
          className="form-check-input"
          {...register("isCompleted")}
        />
        <label htmlFor="isCompleted" className="form-check-label">
          Is Completed?
        </label>
      </div>
      <button className="btn btn-success" type="submit" style={btnStyle}>
        Create
      </button>
      <Link to="/" className="btn btn-outline-secondary ms-3" style={btnStyle}>
        Cancel
      </Link>
      {isSuccess && (
        <p className="text-success my-2">
          Ticket created!{" "}
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
        </p>
      )}
    </form>
  );
}

export default CreateTicketForm;
