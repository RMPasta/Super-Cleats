from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

cart_tickets = db.Table(
    "cart_tickets",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("cart_id", db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id'))),
    db.Column("ticket_id", db.Integer, db.ForeignKey(add_prefix_for_prod('tickets.id'))),
    db.Column("created_at", db.Date, default=datetime.today),
    db.Column("updated_at", db.Date, default=datetime.today),
)

if environment == "production":
    cart_tickets.schema = SCHEMA
