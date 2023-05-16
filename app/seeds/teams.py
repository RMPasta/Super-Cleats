from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text
# from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_teams():
    team1 = Team(
        name='Leeds United',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team2 = Team(
        name='West Ham',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team3 = Team(
        name='Fulham',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team4 = Team(
        name='Brentford',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team5 = Team(
        name='Brighton',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team6 = Team(
        name='Manchester United',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team7 = Team(
        name='Wolverhampton Wanderers',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team8 = Team(
        name='Liverpool',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team9 = Team(
        name='Crystal Palace',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team10 = Team(
        name='Chelsea',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team11 = Team(
        name='Newcastle United',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team12 = Team(
        name='Arsenal',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team13 = Team(
        name='Aston Villa',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team14 = Team(
        name='Manchester City',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team15 = Team(
        name='Everton',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team16 = Team(
        name='Tottenham Hotspur',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team17 = Team(
        name='Burnley',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )
    team18 = Team(
        name='Leicester',
        league="EPL",
        badge_img="https://static1.cdn-subsidesports.com/2/media/catalog/product/cache/38d4094f49a5c2931b615f53f1250097/9/2/92dd496b4190c7f4d10da54cbc581b32b78c5f9a3e9cbc4230372f4aff262178.jpeg",
    )

    db.session.add(team1)
    db.session.add(team2)
    db.session.add(team3)
    db.session.add(team4)
    db.session.add(team5)
    db.session.add(team6)
    db.session.add(team7)
    db.session.add(team8)
    db.session.add(team9)
    db.session.add(team10)
    db.session.add(team11)
    db.session.add(team12)
    db.session.add(team13)
    db.session.add(team14)
    db.session.add(team15)
    db.session.add(team16)
    db.session.add(team17)
    db.session.add(team18)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))

    db.session.commit()
