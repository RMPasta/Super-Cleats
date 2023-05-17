from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Team

team_routes = Blueprint('teams', __name__)


@team_routes.route('/')
def teams():
    """
    Query for all teams and returns them in a list of team dictionaries
    """
    teams = Team.query.all()
    return {'teams': [team.to_dict() for team in teams]}


# @team_routes.route('/<int:id>')
# def team(id):
#     """
#     Query for an team by id and returns that team in a dictionary
#     """
#     team = Team.query.get(id)
#     return team.to_dict()
