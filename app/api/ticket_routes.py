from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Ticket
# from ..aws_helpers import upload_file_to_s3, get_unique_filename

ticket_routes = Blueprint('tickets', __name__)


@ticket_routes.route('/')
def tickets():
    """
    Query for all tickets and returns them in a list of ticket dictionaries
    """
    tickets = Ticket.query.all()
    return {'tickets': [ticket.to_dict() for ticket in tickets]}


@ticket_routes.route('/<int:ticket_id>', methods=["DELETE"])
def delete_ticket(ticket_id):
    """
    Delete ticket
    """
    ticket = Ticket.query.get(ticket_id)
    db.session.delete(ticket)
    db.session.commit()
    return {'message': "Successfully deleted"}
