const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const {
    createTicket,
    getMyTickets,
    getEmployeeDashboard
} = require("../controllers/ticketController");

router.post(
    "/",
    authenticate,
    upload.single("attachment"),
    createTicket
);
router.get("/", authenticate, getMyTickets);
router.get("/dashboard", authenticate, getEmployeeDashboard);

module.exports = router;