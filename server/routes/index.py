from flask import Blueprint, current_app

bp = Blueprint('index', __name__)

@bp.route("/")
def client():
    return current_app.send_static_file('client.html')

