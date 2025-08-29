import os
import django
import json
from http.server import BaseHTTPRequestHandler, HTTPServer

# --- Set Django settings ---
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rewards_api.settings")
django.setup()

# --- Import your models after Django setup ---
from api.models import User, Points, Balance, Reward

# --- Function to get all data ---
def get_all_data():
    users = list(User.objects.values())
    points = list(Points.objects.values())
    balances = list(Balance.objects.values())
    rewards = list(Reward.objects.values())

    return {
        "users": users,
        "points": points,
        "balances": balances,
        "rewards": rewards
    }

# --- HTTP Request Handler ---
class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/all-data/":
            data = get_all_data()
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(data, indent=4).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

# --- Run the server ---
if __name__ == "__main__":
    port = 8000
    print(f"Server started at http://127.0.0.1:{port}/api/all-data/")
    server = HTTPServer(("localhost", port), MyServer)
    server.serve_forever()
