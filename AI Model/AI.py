import requests
import time
import os
from dotenv import load_dotenv

class MukuruChatBot:

    load_dotenv()
    def __init__(self, api_key):
        self.api_key = api_key or os.getenv("MUKURU_CHATBOT")
        print("api ket")
        self.api_url = "https://api.shecodes.io/ai/v1/generate"
        self.context = (
            """Mukuru Financial Advisor Chatbot – Trainer Script
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
"""
        )

    def ask_Mukuru(self, prompt):
        params = {
            "prompt": prompt,
            "context": self.context,
            "key": self.api_key
        }

        for attempt in range(3):  # try 3 times
            try:
                response = requests.get(self.api_url, params=params, timeout=30)  # longer timeout - it takes time to response
                response.raise_for_status()

                data = response.json()
                # Debugging line if needed
                # print("DEBUG: Raw response ->", data)

                return data.get("answer", "No response received from Mukuru.")

            except requests.exceptions.Timeout:
                print(f"Timeout... retrying ({attempt+1}/3)")
                time.sleep(2)  
            except requests.exceptions.RequestException as e:
                return f"API request failed: {e}"

        return "Mukuru did not respond after several attempts. Please try again later."


def main():
    api_key = os.getenv("MUKURU_CHATBOT")
    bot = MukuruChatBot(api_key)

    print("Testing API connection...")

    print("\nMukuru Finance ChatBot is running. Type 'quit' to exit.\n")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit"]:
            print("Goodbye!")
            break

        response = bot.ask_Mukuru(user_input)
        print("Mukuru", response)


if __name__ == "__main__":
    main()
    