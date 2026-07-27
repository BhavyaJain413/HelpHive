import "./TicketModal.css";


function formatDate(date){

    return new Date(date).toLocaleString("en-IN",{

        day:"2-digit",

        month:"short",

        year:"numeric",

        hour:"2-digit",

        minute:"2-digit"

    });

}

export default function TicketModal({ ticket, onClose }) {

    console.log(ticket);
    console.log("updatedAt:", ticket.updatedAt);
    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Ticket Details</h2>

                <p><strong>Ticket No:</strong> {ticket.ticketNumber}</p>

                <p><strong>Employee:</strong> {ticket.user.name}</p>

                <p><strong>Title:</strong> {ticket.title}</p>

                <p><strong>Description:</strong> {ticket.description}</p>

                <p><strong>Category:</strong> {ticket.category}</p>

                <p><strong>Priority:</strong> {ticket.priority}</p>

                <p><strong>Status:</strong> {ticket.status}</p>

                <p>
                    <strong>Created:</strong>{" "}
                    {new Date(ticket.createdAt).toLocaleString()}
                </p>

                <p>
                    <strong>Last Updated:</strong>{" "}
                    {new Date(ticket.updatedAt).toLocaleString()}
                </p>

                {ticket.attachment && (

                    <>
                        <h3>Attachment</h3>

                        <a
                            href={`http://localhost:3000/uploads/${ticket.attachment}`}
                            target="_blank"
                            rel="noreferrer"
                        >

                            <img
                                src={`http://localhost:3000/uploads/${ticket.attachment}`}
                                alt="Attachment"
                                className="ticket-image"
                            />

                        </a>
                    </>

                )}

                <button onClick={onClose}>

                    Close

                </button>

            </div>

        </div>

    );

}