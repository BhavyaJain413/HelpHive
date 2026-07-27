import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const res = await api.post("/users/login", formData);

            login(
                res.data.token,
                res.data.user
            );

            if (res.data.user.role === "ADMIN") {
                navigate("/admin");
            } else {
               navigate("/dashboard");
            }

        } catch (err) {

            setError(
                err.response?.data?.message || "Login failed"
            );

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>HelpHive</h1>

                <p>Employee Helpdesk Portal</p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        Login

                    </button>

                </form>

                <div className="bottom-text">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}