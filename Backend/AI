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
            "You are a Mukuru Rewards ChatBot. You will be helping users save money to earn more points"
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
    