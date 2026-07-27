import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./layout.css";

export default function Layout({ children }) {

    return (

        <>

            <Navbar />

            <div className="main-container">

                <Sidebar />

                <main className="content">

                    {children}

                </main>

            </div>


        </>

    );

}