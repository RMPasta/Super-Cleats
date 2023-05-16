from flask.cli import AppGroup
from .users import seed_users, undo_users
from .carts import seed_carts, undo_carts
from .teams import seed_teams, undo_teams
from .items import seed_items, undo_items
from .tickets import seed_tickets, undo_tickets
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_carts()
        undo_teams()
        undo_items()
        undo_tickets()
        undo_favorites()
    seed_users()
    seed_carts()
    seed_teams()
    seed_items()
    seed_tickets()
    seed_favorites()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_carts()
    undo_teams()
    undo_items()
    undo_tickets()
    undo_favorites()
    # Add other undo functions here
