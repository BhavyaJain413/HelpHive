import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import "./CreateTicket.css";

export default function CreateTicket() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "SOFTWARE",
        priority: "LOW"
    });

    // Separate state for the uploaded file
    const [attachment, setAttachment] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const handleFileChange = (e) => {

            const file = e.target.files[0];

            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {

                setError("Image size should be less than 5 MB.");

                return;

            }

            setError("");

            setAttachment(file);

        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.title.trim().length < 5) {

            setError("Title must be at least 5 characters.");

            return;

        }

        if (formData.description.trim().length < 10) {

            setError("Description must be at least 10 characters.");

            return;

    }

        try {
            // Build the multipart payload
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("priority", formData.priority);

            if (attachment) {
                // "attachment" should match the field name expected by Multer on the backend
                data.append("attachment", attachment);
            }

            // Pass the FormData object directly to api.post
            await api.post("/tickets", data);

            setFormData({

                title: "",

                description: "",

                category: "SOFTWARE",

                priority: "LOW"

            });

            setAttachment(null);

            alert("Ticket Created Successfully!");
            navigate("/tickets");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create ticket."
            );
        }
    };

    return (
        <Layout>
            <div className="ticket-container">
                <h1>Create Ticket</h1>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="ticket-form">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        rows="6"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="SOFTWARE">Software</option>
                        <option value="HARDWARE">Hardware</option>
                        <option value="NETWORK">Network</option>
                        <option value="HR">HR</option>
                        <option value="OTHER">Other</option>
                    </select>

                    <label>Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>

                    <label>Attachment</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}

                        
                    />
                    

                    <button type="submit">
                        Submit Ticket
                    </button>
                </form>
            </div>
        </Layout>
    );
}