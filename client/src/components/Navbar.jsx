import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./layout.css";

export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <h2>HelpHive</h2>

            <div className="navbar-right">

                <span>
                    Welcome, <strong>{user?.name}</strong>
                </span>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>

    );

}