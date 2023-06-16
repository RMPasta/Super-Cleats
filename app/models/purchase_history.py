from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class PurchaseHistory(db.Model):
    __tablename__ = "purchase_history"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    users = db.relationship("User", back_populates="purchase_history")
    teams = db.relationship("Team", back_populates="purchase_history")

    def to_dict(self):
        return {
            'id': self.id,
            'price': self.price,
            'order': self.order,
            'item_id': self.item_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
