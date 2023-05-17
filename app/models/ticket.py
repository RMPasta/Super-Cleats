from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Ticket(db.Model):
    __tablename__ = "tickets"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stadium = db.Column(db.String)
    location = db.Column(db.String)
    match = db.Column(db.String)
    capacity = db.Column(db.Integer)
    ticket_img = db.Column(db.String)
    price = db.Column(db.Integer)
    event_date = db.Column(db.Date)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')))
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    carts = db.relationship("Cart", back_populates="tickets")

    def to_dict(self):
        return {
            'id': self.id,
            'stadium': self.stadium,
            'location': self.location,
            'match': self.match,
            'capacity': self.capacity,
            'ticket_img': self.ticket_img,
            'price': self.price,
            'event_date': self.event_date,
            'cart_id': self.cart_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
