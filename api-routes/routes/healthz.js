const express = require("express");
const router = express.Router();
const {sequelize} = require("../../models/mysql-db-connect");
const checkPayload = require("../../middleware/checkPayload");
const checkQueryParams = require("../../middleware/checkQueryParams");
// checkPayload();
// checkQueryParams();

router.head("/", (req, res) => {
    res.status(405).json({ error: "405 Method Not Allowed" });
});

router.get("/", checkQueryParams, checkPayload,async (req, res) => {
    try {
        await sequelize.authenticate();
        res.setHeader('cache-control', 'no-cache');
        return res.status(200).json({ status: "OK" });
    } catch (error) {
        console.error("Database connection error:", error);
        return res.status(503).json({ status: "503 Service Unavailable" });
    }
});

router.post("/", (req, res) => {
    res.status(405).json({ error: "405 Method Not Allowed" });
});

router.put("/", (req, res) => {
    res.status(405).json({ error: "405 Method Not Allowed" });
});

router.delete("/", (req, res) => {
    res.status(405).json({ error: "405 Method Not Allowed" });
});

router.patch("/", (req, res) => {
    res.status(405).json({ error: "405 Method Not Allowed" });
});


router.options("/", (req, res) => {
    res.status(405).json({ error: "405 Method Not Allowed" });
});

module.exports = router;
