import os
import django
import json
from api.models import User, Points, Balance, Reward

# --- Set Django settings ---
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rewards_api.settings")
django.setup()



def get_all_data():
    users = list(User.objects.values())
    points = list(Points.objects.values())
    balances = list(Balance.objects.values())
    rewards = list(Reward.objects.values())

    data = {
        "users": users,
        "points": points,
        "balances": balances,
        "rewards": rewards
    }
    return data

if __name__ == "__main__":
    data = get_all_data()
    # Pretty-print JSON to console
    print(json.dumps(data, indent=4))
