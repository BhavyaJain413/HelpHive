const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const app = express();

const ticketRoutes = require("./routes/ticketRoutes");

const adminRoutes = require("./routes/adminRoutes");


app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    console.log("Root route hit");
    res.json({
        message: "HelpHive API Running 🚀"
    });
});

module.exports = app;