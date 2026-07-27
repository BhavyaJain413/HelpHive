import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./MyTickets.css";

export default function MyTickets() {

    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchTickets = async () => {

            try {

                const res = await api.get("/tickets");

                setTickets(res.data);
                setLoading(false);

            } catch (error) {

                console.log(error);
                setLoading(false);

            }

        };

        fetchTickets();

    }, []);

    if (loading) {

    return (

        <Layout>

            <h2>Loading Tickets...</h2>

        </Layout>

    );

    }

    return (

        <Layout>

            <h1>My Tickets</h1>

            <table className="ticket-table">

                <thead>

                    <tr>

                        <th>Ticket No.</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created</th>

                    </tr>

                </thead>

                <tbody>

                    {tickets.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="empty"
                            >

                                <h3>No Tickets Yet</h3>

                                <p>Create your first support ticket.</p>

                            </td>

                        </tr>

                    ) : (

                        tickets.map((ticket) => (

                            <tr key={ticket.id}>

                                <td>{ticket.ticketNumber}</td>

                                <td>{ticket.title}</td>

                                <td>{ticket.category}</td>

                                <td>

                                    <span className={`priority ${ticket.priority}`}>

                                        {ticket.priority}

                                    </span>

                                </td>

                                <td>

                                    <span className={`status ${ticket.status}`}>

                                        {ticket.status}

                                    </span>

                                </td>

                                <td>

                                    {new Date(ticket.createdAt).toLocaleDateString()}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </Layout>

    );

}