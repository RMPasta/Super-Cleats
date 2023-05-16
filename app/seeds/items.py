from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text
# from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_items():
    item1 = Item(
        name='red cleats',
        type="cleats",
        price=45,
        description='these things weigh nothing!',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=1,
        user_id='1'
    )
    item2 = Item(
        name='blue cleats',
        type="cleats",
        price=50,
        description='buy one for you friend too!',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=2,
        user_id='2'
    )
    item3 = Item(
        name='green cleats',
        type="cleats",
        price=45,
        description='sooo light weight',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=3,
        user_id='3'
    )
    item4 = Item(
        name='yellow cleats',
        type="cleats",
        price=45,
        description='very sharp',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=4,
        user_id='4'
    )
    item5 = Item(
        name='beige cleats',
        type="cleats",
        price=45,
        description='you can run for days in these, no blisters',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=5,
        user_id='5'
    )
    item6 = Item(
        name='red socks',
        type="socks",
        price=45,
        description='these things weigh nothing!',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=1,
        user_id='1'
    )
    item7 = Item(
        name='blue socks',
        type="socks",
        price=50,
        description='buy one for you friend too!',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=2,
        user_id='2'
    )
    item8 = Item(
        name='green socks',
        type="socks",
        price=45,
        description='sooo light weight',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=3,
        user_id='3'
    )
    item9 = Item(
        name='yellow socks',
        type="socks",
        price=45,
        description='very sharp',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=4,
        user_id='4'
    )
    item10 = Item(
        name='beige socks',
        type="socks",
        price=45,
        description='you can run for days in these, no blisters',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=5,
        user_id='5'
    )
    item11 = Item(
        name='red ball',
        type="ball",
        price=45,
        description='great for kicking into the goal',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=1,
        user_id='1'
    )
    item12 = Item(
        name='blue ball',
        type="ball",
        price=50,
        description='buy one for you friend too!',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=2,
        user_id='2'
    )
    item13 = Item(
        name='green ball',
        type="ball",
        price=45,
        description='sooo light weight',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=3,
        user_id='3'
    )
    item14 = Item(
        name='yellow ball',
        type="ball",
        price=45,
        description='very round',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=4,
        user_id='4'
    )
    item15 = Item(
        name='beige ball',
        type="ball",
        price=45,
        description='rolls nice',
        item_img='https://m.media-amazon.com/images/I/61aHOUGeRSS._AC_SX625_.jpg',
        location='',
        team_id=5,
        user_id='5'
    )

    db.session.add(item1)
    db.session.add(item2)
    db.session.add(item3)
    db.session.add(item4)
    db.session.add(item5)
    db.session.add(item6)
    db.session.add(item7)
    db.session.add(item8)
    db.session.add(item9)
    db.session.add(item10)
    db.session.add(item11)
    db.session.add(item12)
    db.session.add(item13)
    db.session.add(item14)
    db.session.add(item15)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
