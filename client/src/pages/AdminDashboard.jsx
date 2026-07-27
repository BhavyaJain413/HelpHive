import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import "./Dashboard.css";

export default function AdminDashboard() {

    const [stats, setStats] = useState({

        totalTickets: 0,
        openTickets: 0,
        resolvedTickets: 0,
        totalUsers: 0

    });
    const [loading,setLoading]=useState(true);

    useEffect(() => {

        document.title = "Dashboard | HelpHive";
        
        const fetchDashboard = async () => {

            try {

                const res = await api.get("/admin/dashboard");

                setStats(res.data);
                setLoading(false);

            } catch (error) {

                console.log(error);
                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if(loading){

    return(

        <Layout>

            <h2>Loading Admin Dashboard...</h2>

        </Layout>

    );

    }

    return (

        <Layout>

            <h1>Admin Dashboard</h1>

            <div className="cards">

                <div className="card">
                    <h3>Total Tickets</h3>
                    <h2>{stats.totalTickets}</h2>
                </div>

                <div className="card">
                    <h3>Open Tickets</h3>
                    <h2>{stats.openTickets}</h2>
                </div>

                <div className="card">
                    <h3>Resolved Tickets</h3>
                    <h2>{stats.resolvedTickets}</h2>
                </div>

                <div className="card">
                    <h3>Total Users</h3>
                    <h2>{stats.totalUsers}</h2>
                </div>

            </div>

        </Layout>

    );

}