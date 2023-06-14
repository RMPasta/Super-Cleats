from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Ticket
import os
key = os.environ.get("MAPS_API_KEY")
# from ..aws_helpers import upload_file_to_s3, get_unique_filename

maps_routes = Blueprint('maps', __name__)

@maps_routes.route('', methods=["POST"])
def maps_key():
    """
    Get google maps key
    """
    print(key)
    return {'googleMapsAPIKey': key}
