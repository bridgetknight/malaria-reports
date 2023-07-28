from flask import Flask, jsonify
from flask_cors import CORS
import google.auth
import google.auth.transport.requests
import webbrowser
from threading import Timer

app = Flask(__name__)
CORS(app)

## From: https://stackoverflow.com/a/55804230
def generateToken():
    creds, project = google.auth.default()

    # creds.valid is False, and creds.token is None
    # Need to refresh credentials to populate those

    auth_req = google.auth.transport.requests.Request()
    creds.refresh(auth_req)
    token = str(creds.token)
    print("Token received successfully.")
    return token


@app.route("/api/execute", methods=["GET"])
def executeFunction():
    print('Requesting token.')
    result = generateToken()
    return jsonify(result=result), 200, {'Content-Type': 'application/json'}

def open_browser():
    webbrowser.open_new("http://127.0.0.1:5500")

if __name__ == '__main__':
    Timer(1, open_browser).start()
    app.run()