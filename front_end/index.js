// ----- MOCK DATA -----
let user = {
  balance: 500,
  points: 250,
  tier: "Bronze" // start with something valid
};

// ----- DOM ELEMENTS -----
const balanceEl = document.getElementById("balance");
const pointsEl = document.getElementById("points");
const tierEl = document.getElementById("tier");
const pointsEarnedEl = document.getElementById("points-earned");
const calculateBtn = document.getElementById("calculate-btn");
const sendAmountInput = document.getElementById("send-amount");
const sendAmountPreview = document.getElementById("Send-amount-preview");

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

  // Update dashboard + progress
  loadUser();
  updateProgress();
  pointsEarnedEl.textContent = `You earned ${earned} points!`;
  pointsEarnedEl.style.color = "green";
}

// ----- SHOW INFO -----
function showInfo(type) {
  if (type === "balance") {
    alert(`Your current balance is R${user.balance.toFixed(2)}.`);
  } else if (type === "points") {
    alert(`You have ${user.points} points.`);
  } else if (type === "tier") {
    alert(`You are currently in the ${user.tier} tier.`);
  }
}

// ----- UPDATE PROGRESS -----
function updateProgress() {
  let progress = 0;
  let nextTier = "";

  if (user.tier === "Starter") {
    progress = (user.points / 1000) * 100;
    nextTier = "Saver";
  } else if (user.tier === "Achiever") {
    progress = (user.points / 5000) * 100;
    nextTier = "Champion";
  } else {
    progress = 100;
    nextTier = "Max Tier 🎉";
  }

  if (progress > 100) progress = 100;

  document.getElementById("progress-fill").style.width = progress + "%";
  document.getElementById("progress-text").textContent =
    progress >= 100
      ? `Congrats! You've reached ${nextTier}!`
      : `Progress to ${nextTier}: ${Math.floor(progress)}%`;
}

// ----- INIT -----
document.addEventListener("DOMContentLoaded", () => {
  loadUser();
  updateProgress();

  calculateBtn.addEventListener("click", calculatePoints);

  balanceEl.addEventListener("click", () => showInfo("balance"));
  pointsEl.addEventListener("click", () => showInfo("points"));
  tierEl.addEventListener("click", () => showInfo("tier"));

  sendAmountInput.addEventListener("input", () => {
    sendAmountPreview.textContent = `You typed: ${sendAmountInput.value}`;
  });
});
