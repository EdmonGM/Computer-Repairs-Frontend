import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateTicket } from "../../app/api";
import { useNavigate } from "react-router-dom";
import { ICreateTicket, IUpdateTicket } from "../../app/types";

function EditTicketForm({
  id,
  title,
  description,
  isCompleted,
}: IUpdateTicket) {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ICreateTicket>({
    defaultValues: {
      title: title,
      description: description,
      isCompleted: isCompleted,
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isSuccess } = useMutation({
    mutationFn: UpdateTicket,
    mutationKey: ["tickets"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });
  const editTicketHandler: SubmitHandler<ICreateTicket> = async (data: any) => {
    Object.keys(data).forEach((item) => {
      if (typeof data[item] == "string") {
        data[item] = data[item].trim();
      }
    });
    await mutateAsync({
      id: id,
      title: data.title,
      description: data.description,
      isCompleted: data.isCompleted,
    });
  };

  const [descriptionLength, setDescriptionLength] = useState(
    getValues("description")?.length
  );

  const navigate = useNavigate();

  useEffect(() => {
    setDescriptionLength(getValues("description")?.length);
  }, [watch("description")]);

  const btnStyle: React.CSSProperties = {
    width: "72px",
  };

  return (
    <form onSubmit={handleSubmit(editTicketHandler)}>
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
        Save
      </button>
      <button
        className="btn btn-outline-secondary ms-3"
        style={btnStyle}
        type="button"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
      {isSuccess && (
        <p className="text-success my-2">
          Ticket updated!{" "}
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

export default EditTicketForm;
