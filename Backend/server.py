from http.server import BaseHTTPRequestHandler, HTTPServer

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        # Example values; replace with actual project data retrieval logic
        rewards = "Free Coffee"
        balance = 150
        point = 75

        response = f"Rewards: {rewards}, Balance: {balance}, Point: {point}"
        self.wfile.write(response.encode())

if __name__ == "__main__":
    server = HTTPServer(("localhost", 8000), MyServer)
    print("Server started at http://127.0.0.1:8000")
    server.serve_forever()