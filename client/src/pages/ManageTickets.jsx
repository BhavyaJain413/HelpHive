import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TicketModal from "../components/TicketModal";
import api from "../services/api";
import "./MyTickets.css";

export default function ManageTickets() {

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const fetchTickets = async () => {

        try {

            const res = await api.get("/admin/tickets");

            setTickets(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        document.title = "Manage Tickets | HelpHive";

        fetchTickets();

    }, []);

    const updateStatus = async (id, status) => {

        try {

            await api.patch(`/admin/tickets/${id}/status`, {
                status
            });

            fetchTickets();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteTicket = async (id) => {

        if (!window.confirm("Delete this ticket?")) return;

        try {

            await api.delete(`/admin/tickets/${id}`);

            fetchTickets();

        } catch (error) {

            console.log(error);

        }

    };

    if (loading) {

        return (

            <Layout>

                <h2>Loading Tickets...</h2>

            </Layout>

        );

    }

    return (

        <Layout>

            <h1>Manage Tickets</h1>

            <table className="ticket-table">

                <thead>

                    <tr>

                        <th>No.</th>

                        <th>Employee</th>

                        <th>Title</th>

                        <th>Status</th>

                        <th>Priority</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {tickets.length === 0 ? (

                        <tr>

                            <td colSpan="6" className="empty">

                                <h3>No Tickets Found</h3>

                            </td>

                        </tr>

                    ) : (

                        tickets.map(ticket => (

                            <tr key={ticket.id}>

                                <td>{ticket.ticketNumber}</td>

                                <td>{ticket.user?.name}</td>

                                <td>{ticket.title}</td>

                                <td>

                                    <select
                                        value={ticket.status}
                                        onChange={(e) =>
                                            updateStatus(ticket.id, e.target.value)
                                        }
                                    >

                                        <option value="OPEN">OPEN</option>
                                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                                        <option value="RESOLVED">RESOLVED</option>
                                        <option value="CLOSED">CLOSED</option>

                                    </select>

                                </td>

                                <td>{ticket.priority}</td>

                                <td>

                                    <button
                                        className="btn-view"
                                        onClick={() => setSelectedTicket(ticket)}
                                    >

                                        View

                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() => deleteTicket(ticket.id)}
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

            {selectedTicket && (

                <TicketModal
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                />

            )}

        </Layout>

    );

}