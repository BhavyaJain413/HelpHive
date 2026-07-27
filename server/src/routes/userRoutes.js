const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authMiddleware");


const {
    getUsers,
    registerUser,
    loginUser
} = require("../controllers/userController");

router.get("/", authenticate, getUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;