const prisma = require("../config/prisma");

const getAllTickets = async (req, res) => {

    try {

        const tickets = await prisma.ticket.findMany({

            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
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

const updateTicketStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const ticket = await prisma.ticket.update({

            where: {
                id: Number(id)
            },

            data: {
                status
            }

        });

        res.json(ticket);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const deleteTicket = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.ticket.delete({

            where: {
                id: Number(id)
            }

        });

        res.json({
            message: "Ticket deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const getDashboard = async (req, res) => {

    try {

        const totalTickets = await prisma.ticket.count();

        const openTickets = await prisma.ticket.count({
            where: {
                status: "OPEN"
            }
        });

        const resolvedTickets = await prisma.ticket.count({
            where: {
                status: "RESOLVED"
            }
        });

        const totalUsers = await prisma.user.count();

        res.json({

            totalTickets,

            openTickets,

            resolvedTickets,

            totalUsers

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    getAllTickets,
    updateTicketStatus,
    deleteTicket,
    getDashboard
};