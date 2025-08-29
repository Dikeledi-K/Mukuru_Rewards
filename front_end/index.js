// ----- MOCK DATA -----
let user = {
  balance: 500,
  points: 250,
  tier: "Silver"
};

// ----- DOM ELEMENTS -----
const balanceEl = document.getElementById("balance");
const pointsEl = document.getElementById("points");
const tierEl = document.getElementById("tier");
const pointsEarnedEl = document.getElementById("points-earned");
const calculateBtn = document.getElementById("calculate-btn");
const sendAmountInput = document.getElementById("send-amount");

// ----- LOAD DASHBOARD -----
function loadUser() {
  balanceEl.textContent = `R${user.balance.toFixed(2)}`;
  pointsEl.textContent = user.points;
  tierEl.textContent = user.tier;
}

// ----- CALCULATE POINTS -----
function calculatePoints() {
  const amount = parseFloat(sendAmountInput.value);
  if (isNaN(amount) || amount <= 0) {
    pointsEarnedEl.textContent = "Enter a valid amount";
    pointsEarnedEl.style.color = "red";
    return;
  }

  let earned = 0;

  if (amount < 1000) {
    earned = Math.floor(amount / 10) * 1;
    user.tier = "Bronze";
  } else if (amount < 5000) {
    earned = Math.floor(amount / 10) * 1.5;
    user.tier = "Silver";
  } else {
    earned = Math.floor(amount / 10) * 2;
    user.tier = "Gold";
  }

  user.points += earned;
  user.balance -= amount;

  // Update dashboard
  loadUser();
  pointsEarnedEl.textContent = `You earned ${earned} points!`;
  pointsEarnedEl.style.color = "green";
}

// ----- SHOW MORE INFO WHEN CLICKED -----
function showInfo(type) {
  if (type === "balance") {
    alert(`Your current balance is R${user.balance.toFixed(2)}.`);
  } else if (type === "points") {
    alert(`You have ${user.points} points.`);
  } else if (type === "tier") {
    alert(`You are currently in the ${user.tier} tier.`);
  }
}

// ----- EVENT LISTENERS -----
document.addEventListener("DOMContentLoaded", () => {
  loadUser();

  // Calculate button
  calculateBtn.addEventListener("click", calculatePoints);

  // Clickable dashboard items
  balanceEl.addEventListener("click", () => showInfo("balance"));
  pointsEl.addEventListener("click", () => showInfo("points"));
  tierEl.addEventListener("click", () => showInfo("tier"));
});

const sendAmountPreview = document.getElementById("Send-amount-preview");

sendAmountInput.addEventListener("input", () => {
    sendAmountPreview.textContent = `You typed: ${sendAmountInput.value}`;
});
