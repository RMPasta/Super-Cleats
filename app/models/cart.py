from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Cart(db.Model):
    __tablename__ = "carts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    total_price = db.Column(db.Integer)
    # item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
    # ticket_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tickets.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    users = db.relationship("User", back_populates="carts")
    items = db.relationship("Item", back_populates="carts")
    tickets = db.relationship("Ticket", back_populates="carts")

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'total_price': self.total_price,
            # 'item_id': self.item_id,
            # 'ticket_id': self.ticket_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
