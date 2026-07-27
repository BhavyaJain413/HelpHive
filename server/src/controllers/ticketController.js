const prisma = require("../config/prisma");

const createTicket = async (req, res) => {

    try {

        const {
            title,
            description,
            category,
            priority
        } = req.body;

        const lastTicket = await prisma.ticket.findFirst({

            orderBy: {

                id: "desc"

            }

        });

        let ticketNumber = "HH-0001";

        if (lastTicket) {

            const lastNumber = parseInt(
                lastTicket.ticketNumber.split("-")[1]
            );

            ticketNumber = `HH-${String(lastNumber + 1).padStart(4, "0")}`;

        }

        const ticket = await prisma.ticket.create({

            data: {

                ticketNumber,

                title,

                description,

                category,

                priority,

                attachment: req.file ? req.file.filename : null,

                userId: req.user.id

            }

        });

        res.status(201).json(ticket);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: error.message

        });

    }

};


const getMyTickets = async (req, res) => {
    try {

        const tickets = await prisma.ticket.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json(tickets);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

const getEmployeeDashboard = async (req, res) => {

    try {

        const totalTickets = await prisma.ticket.count({
            where: {
                userId: req.user.id
            }
        });

        const openTickets = await prisma.ticket.count({
            where: {
                userId: req.user.id,
                status: "OPEN"
            }
        });

        const resolvedTickets = await prisma.ticket.count({
            where: {
                userId: req.user.id,
                status: "RESOLVED"
            }
        });

        res.json({
            totalTickets,
            openTickets,
            resolvedTickets
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createTicket,
    getMyTickets,
    getEmployeeDashboard
};
