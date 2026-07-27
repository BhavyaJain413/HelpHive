import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./layout.css";

export default function Sidebar() {

    const { user } = useAuth();

    return (

        <aside className="sidebar">

            <h3>HelpHive</h3>

            {user?.role === "EMPLOYEE" && (
                <>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/tickets"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        My Tickets
                    </NavLink>

                    <NavLink
                        to="/create-ticket"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Create Ticket
                    </NavLink>

                </>
            )}

            {user?.role === "ADMIN" && (
                <>

                    <NavLink
                        to="/admin"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Admin Dashboard
                    </NavLink>

                    <NavLink
                        to="/manage-tickets"
                        className={({ isActive }) => isActive ? "active-link" : ""}
                    >
                        Manage Tickets
                    </NavLink>

                </>
            )}

        </aside>

    );

}