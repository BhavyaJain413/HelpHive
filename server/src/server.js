const express = require("express");
const path = require("path");

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
