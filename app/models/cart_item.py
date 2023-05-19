from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

cart_items = db.Table(
    "cart_items",
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("cart_id", db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id'))),
    db.Column("item_id", db.Integer, db.ForeignKey(add_prefix_for_prod('items.id'))),
    db.Column("created_at", db.Date, default=datetime.today),
    db.Column("updated_at", db.Date, default=datetime.today),
)

if environment == "production":
    cart_items.schema = SCHEMA
