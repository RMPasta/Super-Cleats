from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Team(db.Model):
    __tablename__ = "teams"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    league = db.Column(db.String)
    badge_img = db.Column(db.String)
    created_at = db.Column(db.Date, default=datetime.today)
    updated_at = db.Column(db.Date, default=datetime.today)

    items = db.relationship("Item", back_populates="teams", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'league': self.league,
            'badge_img': self.badge_img,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
