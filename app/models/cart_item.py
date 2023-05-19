from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')))
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    # carts = db.relationship("Cart", back_populates="items")
    # items = db.relationship("Item", back_populates="carts")

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'item_id': self.item_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
