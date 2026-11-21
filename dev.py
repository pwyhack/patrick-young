"""Local preview that mirrors pwy.ai routing: /babu serves babu.html.

    python3 dev.py   ->  http://127.0.0.1:8800
"""
import http.server, os

class Handler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and os.path.exists(path + ".html"):
            self.path = self.path.split("?")[0] + ".html"
        elif not os.path.exists(path):
            self.path = "/404.html"
        return super().send_head()

os.chdir(os.path.dirname(os.path.abspath(__file__)))
http.server.ThreadingHTTPServer(("127.0.0.1", 8800), Handler).serve_forever()
