const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ddos-detection', {
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define Traffic Schema
const trafficSchema = new mongoose.Schema({
    ip: String,
    timestamp: { type: Date, default: Date.now }
});

const Traffic = mongoose.model('Traffic', trafficSchema);

// ✅ POST: Add traffic data
app.post("/traffic", async (req, res) => {
    try {
        const { ip } = req.body;
        const trafficData = new Traffic({ ip });
        await trafficData.save();
        res.status(201).json({ message: "Traffic data added", data: trafficData });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ GET: Retrieve all traffic data
app.get('/traffic', async (req, res) => {
    try {
        const trafficData = await Traffic.find();
        res.status(200).json(trafficData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving traffic data" });
    }
});

// ✅ DELETE: Remove a specific traffic entry by IP
app.delete('/traffic/:ip', async (req, res) => {
    try {
        const { ip } = req.params;
        const result = await Traffic.findOneAndDelete({ ip });

        if (!result) {
            return res.status(404).json({ message: "IP address not found" });
        }

        res.status(200).json({ message: `Traffic data for IP ${ip} deleted` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting traffic data" });
    }
});

// ✅ GET: Entropy detection endpoint (correct version)
app.get('/api/entropy', async (req, res) => {
    try {
        // Dummy logic for entropy calculation (you can replace this later)
        const trafficCount = await Traffic.countDocuments();
        const entropy = Math.random() * 10; // Simulated entropy value
        const attackDetected = entropy > 5; // Threshold example

        res.json({ entropy, attackDetected });
    } catch (error) {
        res.status(500).json({ error: "Error calculating entropy" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
