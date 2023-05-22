from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    vinnie = User(
        username='vinnie', email='vinnie@aa.io', password='password')
    rodri = User(
        username='rodri', email='rodri@aa.io', password='password')
    ilkay = User(
        username='ilkay', email='ilkay@aa.io', password='password')
    debruyne = User(
        username='debruyne', email='debruyne@aa.io', password='password')
    erling = User(
        username='erling', email='erling@aa.io', password='password')
    messi = User(
        username='messi', email='messi@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(vinnie)
    db.session.add(rodri)
    db.session.add(ilkay)
    db.session.add(debruyne)
    db.session.add(erling)
    db.session.add(messi)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
