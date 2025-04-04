import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { DeleteTicket, UpdateTicket } from "../../app/api";
import { useNavigate } from "react-router-dom";
import { ICreateTicket, IUpdateTicket } from "../../app/types";
import { useUserStore } from "../../app/store";
import InputField from "../InputField";

function EditTicketForm({
  id,
  title,
  description,
  isCompleted,
}: IUpdateTicket) {
  const { role } = useUserStore();

  const methods = useForm<ICreateTicket>({
    defaultValues: {
      title,
      description,
      isCompleted,
    },
  });
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods;

  const queryClient = useQueryClient();
  const { mutateAsync: editTicket, isSuccess: isEditSuccess } = useMutation({
    mutationFn: UpdateTicket,
    mutationKey: ["tickets"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] }),
  });
  const { mutateAsync: deleteTicket } = useMutation({
    mutationFn: DeleteTicket,
    mutationKey: ["tickets"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      navigate("/tickets");
    },
  });

  const editTicketHandler: SubmitHandler<ICreateTicket> = async (data: any) => {
    Object.keys(data).forEach((item) => {
      if (typeof data[item] == "string") {
        data[item] = data[item].trim();
      }
    });
    await editTicket({
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(editTicketHandler)}>
        <InputField
          name="title"
          label="Title"
          placeholder="Enter Ticket Title"
          rules={{
            required: { value: true, message: "Title is required" },
            minLength: {
              value: 5,
              message: "Title should not be less than 5 letters",
            },
            maxLength: {
              value: 50,
              message: "Title should not be more than 50 letters",
            },
          }}
        />
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
        <div className="d-flex gap-3">
          <button className="btn btn-success" type="submit" style={btnStyle}>
            Save
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => navigate(-1)}
            style={btnStyle}
          >
            Cancel
          </button>
          {role === "Admin" && (
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => deleteTicket(id)}
              style={btnStyle}
            >
              Delete
            </button>
          )}
        </div>
        {isEditSuccess && (
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
    </FormProvider>
  );
}

export default EditTicketForm;
