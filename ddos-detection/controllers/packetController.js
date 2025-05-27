const Packet = require("../models/Packet");

// Log incoming packets
const logPacket = async (req, res) => {
  try {
    const { sourceIP, destinationIP, packetSize } = req.body;
    const newPacket = new Packet({ sourceIP, destinationIP, packetSize });

    await newPacket.save();
    res.status(201).json({ message: "Packet logged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch logged packets
const getPackets = async (req, res) => {
  try {
    const packets = await Packet.find();
    res.json(packets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { logPacket, getPackets };
