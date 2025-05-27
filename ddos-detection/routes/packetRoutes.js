const express = require("express");
const router = express.Router();
const { logPacket, getPackets } = require("../controllers/packetController");

// Route to log incoming packets
router.post("/log", logPacket);

// Route to fetch logged packets
router.get("/", getPackets);

module.exports = router;
