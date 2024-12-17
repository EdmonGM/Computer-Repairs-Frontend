import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetTicketById } from "../app/api";
import EditTicketForm from "../components/edit/EditTicketForm";

function TicketEdit() {
  const { id } = useParams();
  if (!id) return;

  const { data: ticket, isFetching } = useQuery({
    queryFn: () => GetTicketById(id),
    queryKey: ["tickets"],
  });
  const dateOptions: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (isFetching) return <p>Loading...</p>;

  if (ticket) {
    return (
      <section className="my-4">
        <h1>Edit Ticket</h1>
        <section className="my-4">
          <p className="fw-bold my-0">
            Ticket Id: <span className="fw-normal text-secondary">{id}</span>
          </p>
          <div className="d-flex flex-wrap column-gap-4">
            <p className="fw-bold my-0">
              Created On:{" "}
              <span className="fw-normal text-secondary">
                {new Date(ticket.createdDate).toLocaleDateString(
                  "en-GB",
                  dateOptions
                )}
              </span>
            </p>
            <p className="fw-bold my-0">
              Updated On:{" "}
              <span className="fw-normal text-secondary">
                {new Date(ticket.updatedDate).toLocaleDateString(
                  "en-GB",
                  dateOptions
                )}
              </span>
            </p>
          </div>
        </section>
        <EditTicketForm
          id={ticket.id}
          title={ticket.title}
          description={ticket.description}
          isCompleted={ticket.isCompleted}
        />
      </section>
    );
  }
}

export default TicketEdit;
