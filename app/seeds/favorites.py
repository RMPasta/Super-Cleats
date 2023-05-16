from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
# from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_favorites():
    favorite1 = Favorite(
        type="item",
        name='red cleats',
        story='these things were amazing! i wish i could wear them everywhere',
        teams="Manchester United",
        user_id='1'
    )
    favorite2 = Favorite(
        type="item",
        name='blue cleats',
        story='wow they are great and blue! i got some for my friend',
        teams="Manchester City",
        user_id='2'
    )
    favorite3 = Favorite(
        type="item",
        name='green cleats',
        story='love these green cleats! i wore them to the london stadium just last week',
        teams="West Ham",
        user_id='3'
    )
    favorite4 = Favorite(
        type="item",
        name='yellow cleats',
        story='too sharp!!!',
        teams="Brentford",
        user_id='4'
    )
    favorite5 = Favorite(
        type="item",
        name='beige cleats',
        story='i ran a bunch in these and i did get a blister. they look cool though',
        teams="Liverpool",
        user_id='5'
    )
    favorite6 = Favorite(
        type="ticket",
        name='Everton vs Brighton',
        story='this was really a day to remember. class act out there today up there',
        teams="Everton, Brighton",
        user_id='1'
    )
    favorite7 = Favorite(
        type="ticket",
        name='Liverpool vs Chelsea',
        story='match of the season in my opinion!',
        teams="Liverpool, Chelsea",
        user_id='2'
    )
    favorite8 = Favorite(
        type="ticket",
        name='Manchester City vs Tottenham Hotspur',
        story='what a day at the etihad... we crushed \'em',
        teams="Manchester City, Tottenham Hotspur",
        user_id='3'
    )
    favorite9 = Favorite(
        type="ticket",
        name='Brighton vs Manchester United',
        story='this was the best day of my life and i\'ve lived a lot of days',
        teams="Brighton, Manchester United",
        user_id='4'
    )
    favorite10 = Favorite(
        type="ticket",
        name='Leeds United vs West Ham',
        story='west ham were all over the place today. what a crazy time!',
        teams="Leeds United, West Ham",
        user_id='5'
    )

    db.session.add(favorite1)
    db.session.add(favorite2)
    db.session.add(favorite3)
    db.session.add(favorite4)
    db.session.add(favorite5)
    db.session.add(favorite6)
    db.session.add(favorite7)
    db.session.add(favorite8)
    db.session.add(favorite9)
    db.session.add(favorite10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
