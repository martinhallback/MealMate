from main import app

@app.route("/")
def client():
   return app.send_static_file('index.html')