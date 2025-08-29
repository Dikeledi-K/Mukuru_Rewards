// ----- MOCK DATA -----
let user = {
  balance: 5000,
  mkCoins: 0,
  tier: "Newbie", // start from Newbie (important!)
  isSendingToCardHolder: false
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
  pointsEl.textContent = `${user.mkCoins} MK Coins`;
  tierEl.textContent = user.tier;
}

// ----- CALCULATE MK COINS -----
function calculateMkCoins() {
  const amount = parseFloat(sendAmountInput.value);
  if (isNaN(amount) || amount <= 0 || amount > balanceEl) {
    pointsEarnedEl.textContent = "Enter a valid amount";
    pointsEarnedEl.style.color = "red";
    return;
  }

  // Cashback logic
  const earned = user.isSendingToCardHolder
    ? Math.floor(amount * 0.02) // 2% cashback
    : Math.floor(amount * 0.01); // 1% cashback

  // Update user state
  user.mkCoins += earned;
  user.balance -= amount;

  // Update UI
  loadUser();
  updateProgress();
  pointsEarnedEl.textContent = `You earned ${earned} MK Coins!`;
  pointsEarnedEl.style.color = "black";


  //Check milestones
  checkTierMilestone();
}

// ----- CHECK FOR TIER MILESTONE -----
// function checkTierMilestone() {
//   if (user.mkCoins >= 200 && user.mkCoins < 500 && user.tier === "Newbie") {
//     showTierChoice("You’ve reached 200 MK Coins! 🎉 Redeem Starter reward (R20 Airtime) or save for Saver tier?", 200, "R20 Airtime", "Starter");
//   } 
//   else if (user.mkCoins >= 500 && user.mkCoins < 1000 && user.tier === "Starter") {
//     showTierChoice("You’ve reached 500 MK Coins! 🎉 Redeem Saver reward (R30 Airtime + R30 Electricity) or save for Achiever tier?", 500, "R30 Airtime + R30 Electricity", "Saver");
//   } 
//   else if (user.mkCoins >= 1000 && user.mkCoins < 2000 && user.tier === "Saver") {
//     showTierChoice("You’ve reached 1000 MK Coins! 🎉 Redeem Achiever reward (R100 off Funeral Cover OR Uber Eats Meal) or save for Champion tier?", 1000, "R100 off Funeral Cover ", "Achiever");
//   } 
//   else if (user.mkCoins >= 2000 && user.tier === "Achiever") {
//     showTierChoice("You’ve reached 2000 MK Coins! 🎉 Redeem Champion reward (R200 Grocery Voucher) or save for VIP status?", 2000, "R200 Grocery Voucher", "Champion");
//   }
// }

// ----- TIER CHOICE POPUP -----
function showTierChoice(message, cost, reward, tierName) {
  const choice = confirm(`${message}\n\nReward: ${reward}\n\nClick OK to redeem, Cancel to save.`);

  if (choice) {
    // user.mkCoins -= cost;
    // alert(`You redeemed: ${reward}`);
  } else {
    user.tier = tierName;
    alert(`You are now in the ${tierName} tier! Keep saving for the next reward.`);
  }

  loadUser();
  updateProgress();
}

// ----- UPDATE PROGRESS BAR -----
function updateProgress() {
  let progress = 0;
  let nextTier = "";

  if (user.mkCoins < 200) {
    progress = (user.mkCoins / 200) * 100;
    nextTier = "Starter";
  } else if (user.mkCoins < 500) {
    progress = ((user.mkCoins - 200) / (500 - 200)) * 100;
    nextTier = "Saver";
  } else if (user.mkCoins < 1000) {
    progress = ((user.mkCoins - 500) / (1000 - 500)) * 100;
    nextTier = "Achiever";
  } else if (user.mkCoins < 2000) {
    progress = ((user.mkCoins - 1000) / (2000 - 1000)) * 100;
    nextTier = "Champion";
  } else {
    progress = 100;
    nextTier = "Max Tier 🎉";
  }

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
  calculateBtn.addEventListener("click", calculateMkCoins);
});
