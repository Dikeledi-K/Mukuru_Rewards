const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// --- Load CSV Helper ---
function loadCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, "users.csv"))
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

// --- Rewards Marketplace (static for now) ---
const rewards = [
  { id: "RW1", name: "Airtime R50", description: "Buy airtime with points", cost: 100 },
  { id: "RW2", name: "Grocery Voucher R100", description: "Voucher for groceries", cost: 200 },
  { id: "RW3", name: "Electricity Token R200", description: "Pay electricity bill", cost: 400 }
];

// Store redemptions in memory for now
let redeemed = [];

// --- API Routes ---

// 1. Marketplace
app.get("/api/rewards", (req, res) => {
  res.json(rewards);
});

// 2. Rewards History
app.get("/api/history/:userId", async (req, res) => {
  const userId = req.params.userId;
  const rows = await loadCSV();

  // Get all completed transactions for user
  const history = rows
    .filter(row => row.user_id === userId && row.status === "Completed")
    .map(row => ({
      date: row.date,
      description: row.transaction_type || row.merchant_name || "Transaction",
      points: Math.floor(parseFloat(row.amount) / 10)
    }));

  // Add redemptions
  const redemptions = redeemed.filter(r => r.userId === userId);
  const allHistory = [...history, ...redemptions];

  // Sort by date desc
  allHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.json(allHistory);
});

// 3. Redeem Reward
app.post("/api/redeem", async (req, res) => {
  const { userId, rewardId } = req.body;
  const reward = rewards.find(r => r.id === rewardId);

  if (!reward) return res.status(400).json({ message: "Invalid reward" });

  // Calculate available points
  const rows = await loadCSV();
  let points = 0;
  rows.forEach(row => {
    if (row.user_id === userId && row.status === "Completed") {
      points += Math.floor(parseFloat(row.amount) / 10);
    }
  });

  // Deduct redeemed points
  const usedPoints = redeemed
    .filter(r => r.userId === userId)
    .reduce((sum, r) => sum + Math.abs(r.points), 0);

  const availablePoints = points - usedPoints;

  if (availablePoints < reward.cost) {
    return res.json({ message: "Not enough points to redeem this reward." });
  }

  // Save redemption
  redeemed.push({
    userId,
    rewardId,
    date: new Date().toISOString(),
    description: `Redeemed ${reward.name}`,
    points: -reward.cost
  });

  res.json({ message: `Successfully redeemed ${reward.name}!` });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







