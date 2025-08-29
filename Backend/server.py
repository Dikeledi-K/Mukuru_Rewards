import os
import sys

# Add current folder to Python path (so 'api' can be found)
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import django
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from api.models import User, Points, Balance, Reward

# --- Set Django settings module ---
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "rewards_api.settings")

# --- Setup Django ---
django.setup()


# --- Function to get all data ---
def get_all_data():
    return {
        "users": list(User.objects.values()),
        "points": list(Points.objects.values()),
        "balances": list(Balance.objects.values()),
        "rewards": list(Reward.objects.values())
    }

# --- HTTP request handler ---
class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/all-data/":
            try:
                data = get_all_data()
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(data, indent=4).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(f"Server Error: {e}".encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

# --- Run the server ---
if __name__ == "__main__":
    port = 8001
    print(f"Server started at http://127.0.0.1:{port}/api/all-data/")
    server = HTTPServer(("localhost", port), MyServer)
    server.serve_forever()
