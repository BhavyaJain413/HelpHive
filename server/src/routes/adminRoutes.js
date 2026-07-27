const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

const {
    getAllTickets,
    updateTicketStatus,
    deleteTicket,
    getDashboard
} = require("../controllers/adminController");

router.patch(
    "/tickets/:id/status",
    authenticate,
    authorizeAdmin,
    updateTicketStatus
);

router.get(
    "/tickets",
    authenticate,
    authorizeAdmin,
    getAllTickets
);


router.delete(
    "/tickets/:id",
    authenticate,
    authorizeAdmin,
    deleteTicket
);

router.get(
    "/dashboard",
    authenticate,
    authorizeAdmin,
    getDashboard
);

module.exports = router;