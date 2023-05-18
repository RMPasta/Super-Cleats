from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Item(db.Model):
    __tablename__ = "items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    item_img = db.Column(db.String, nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    # cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')))
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    users = db.relationship("User", back_populates="items")
    # carts = db.relationship("Cart", back_populates="items")
    teams = db.relationship("Team", back_populates="items")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'price': self.price,
            'description': self.description,
            'item_img': self.item_img,
            'team_id': self.team_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
