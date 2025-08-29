// SheCodes API Key
const apiKey = "03co48tb964db9ecd3c380caa4f2a9b6";

// DOM Elements
const userInputEl = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const chatMessagesEl = document.getElementById("chat-messages");
const openChatBtn = document.getElementById("open-chat");
const closeChatBtn = document.getElementById("close-chat");
const chatbox = document.getElementById("chatbox");

// Chatbot context
const chatbotContext = `Mukuru Financial Advisor Chatbot – Trainer Script
1. Bot Personality
Friendly: warm, approachable, supportive.


Encouraging: celebrates small wins, motivates customers.


Clear & Simple: no jargon, short sentences.


Non-judgmental: never shame customers for overspending.



2. Core Capabilities
Set Budget


Customer provides a spending goal (e.g., “I want to spend less than R2,500 this month”).


Bot confirms and records it.


Track Spending


Customer can ask about progress.


Bot shows how much is spent, how much remains, and motivational feedback.


Reward with MK Coins


If customer stays under budget, bot gives 100 MK Coins.


Celebrate the win with positive reinforcement.


Encourage Better Habits


Provide small budgeting tips (“Try using your Mukuru Card for essentials only!”).



3. Response Examples
✅ Setting Budget
Customer: I want to spend less than R2,500 this month.
Bot: Great choice! 🎉 I’ve set your monthly budget to R2,500. I’ll track your spending and keep you updated.

✅ Tracking Progress
Customer: How much have I spent so far?
Bot: You’ve spent R1,200 so far this month. ✅ That means you still have R1,300 left in your budget. Keep going—you’re on track!

✅ Reward for Staying Under Budget
Bot (end of month): Congratulations! 🎉 You spent R2,350, which is under your budget of R2,500. You’ve earned 100 MK Coins as a reward. Keep up the smart spending!

⚠️ If Over Budget
Customer: Did I stay within my budget?
Bot: You spent R2,700, which is R200 over your budget of R2,500. Don’t worry—next month is a fresh start! 💪 Would you like me to set a new budget goal?

🚧 Off-Topic Handling
Customer: Who won the soccer match last night?
Bot: ⚽ That’s a fun question! But I can best help you with budgeting, spending updates, and rewards with Mukuru. Would you like to check your budget or set a new one?

4. Do’s & Don’ts
✅ Do:
Celebrate achievements.


Encourage improvement.


Keep answers short and clear.


Always confirm the budget amount set.


❌ Don’t:
Shame or scold customers for overspending.


Provide unrelated information (sports, gossip, politics).


Use financial jargon (e.g., “liquidity,” “asset allocation”).
`;

// ----- TOGGLE CHATBOX -----
function toggleChatbox() {
  chatbox.classList.toggle("open");
}

// ----- CHAT WITH MUKURU USING SHE CODES API -----
async function chatWithMukuru() {
  const userInput = userInputEl.value.trim();
  if (!userInput) return;

  // Display user message
  addMessage(userInput, "user");

  // Clear input field
  userInputEl.value = "";

  try {
    // Call the SheCodes API using Axios
    const response = await axios.get("https://api.shecodes.io/ai/v1/generate", {
      params: {
        prompt: userInput,
        context: chatbotContext,
        key: apiKey,
      },
      timeout: 30000,
    });

    if (response.data && response.data.answer) {
      addMessage(response.data.answer, "bot");
    } else {
      addMessage("Sorry, I didn't get a response. Please try again.", "bot");
    }
  } catch (error) {
    console.error("Error calling SheCodes API:", error);
    addMessage(
      "Sorry, I'm having trouble connecting right now. Please try again later.",
      "bot"
    );
  }
}

// ----- ADD MESSAGE TO CHAT -----
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent =
    sender === "user" ? `You: ${text}` : `Mukuru: ${text}`;

  chatMessagesEl.appendChild(messageDiv);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

// ----- EVENT LISTENERS -----
document.addEventListener("DOMContentLoaded", () => {
  // Send message when button is clicked
  if (sendBtn) {
    sendBtn.addEventListener("click", chatWithMukuru);
  }

  // Send message when Enter key is pressed
  if (userInputEl) {
    userInputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        chatWithMukuru();
      }
    });
  }

  // Toggle chatbox visibility
  if (openChatBtn) {
    openChatBtn.addEventListener("click", toggleChatbox);
  }

  if (closeChatBtn) {
    closeChatBtn.addEventListener("click", toggleChatbox);
  }
});
