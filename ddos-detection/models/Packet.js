const mongoose = require("mongoose");

const packetSchema = new mongoose.Schema({
  sourceIP: { type: String, required: true },
  destinationIP: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  packetSize: { type: Number, required: true },
});

module.exports = mongoose.model("Packet", packetSchema);
