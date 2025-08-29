import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

# --- Function to load data from database file ---
def load_database():
    try:
        database_path = os.path.join(os.path.dirname(__file__), 'database.json')
        with open(database_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print("Warning: database.json not found, using empty data")
        return {"users": [], "points": [], "balances": [], "rewards": []}
    except json.JSONDecodeError:
        print("Warning: database.json is corrupted, using empty data")
        return {"users": [], "points": [], "balances": [], "rewards": []}

# --- HTTP Request Handler ---
class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/all-data/":
            data = load_database()
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")  # Enable CORS
            self.end_headers()
            self.wfile.write(json.dumps(data, indent=4).encode("utf-8"))
        elif self.path == "/":
            # Root endpoint with basic info
            info = {
                "message": "Mukuru Rewards API Server",
                "endpoints": [
                    "/api/all-data/ - Get all rewards data from database",
                    "/ - This information"
                ],
                "database_file": "database.json"
            }
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(info, indent=4).encode("utf-8"))
        else:
            self.send_response(404)
            self.send_header("Content-type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            error = {"error": "Not Found", "path": self.path}
            self.wfile.write(json.dumps(error, indent=4).encode("utf-8"))

# --- Run the server ---
if __name__ == "__main__":
    port = 8000
    print(f"Server started at http://127.0.0.1:{port}/")
    print(f"API endpoint: http://127.0.0.1:{port}/api/all-data/")
    print("Reading data from database.json file")
    print("Press Ctrl+C to stop the server")
    
    server = HTTPServer(("localhost", port), MyServer)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        server.server_close()
        print("Server stopped.")
