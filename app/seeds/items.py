from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text
# from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_items():
    item1 = Item(
        name='classic cleats',
        type="cleats",
        price=32,
        description='these things weigh nothing!',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats1.jpg',
        location='',
        team_id=1,
        user_id='1'
    )
    item2 = Item(
        name='left cleats',
        type="cleats",
        price=50,
        description='buy one for you friend too!',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats2.jpg',
        location='',
        team_id=2,
        user_id='2'
    )
    item3 = Item(
        name='many cleats',
        type="cleats",
        price=222,
        description='sooo many cleats',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats3.jpg',
        location='',
        team_id=3,
        user_id='3'
    )
    item4 = Item(
        name='hard cleats',
        type="cleats",
        price=14,
        description='very sharp',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats4.jpg',
        location='',
        team_id=4,
        user_id='4'
    )
    item5 = Item(
        name='purple cleats',
        type="cleats",
        price=43,
        description='you can run for days in these, no blisters',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats5.jpg',
        location='',
        team_id=5,
        user_id='5'
    )
    item6 = Item(
        name='blue cleats',
        type="cleats",
        price=66,
        description='great leisure cleats',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats6.jpg',
        location='',
        team_id=6,
        user_id='1'
    )
    item7 = Item(
        name='the best cleats',
        type="cleats",
        price=74,
        description='these are the best cleats and i wont take no for an answer',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats7.jpg',
        location='',
        team_id=7,
        user_id='2'
    )
    item8 = Item(
        name='cleats here!',
        type="cleats",
        price=99,
        description='im telling you to buy these cleats!!!',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats8.jpg',
        location='',
        team_id=8,
        user_id='3'
    )
    item9 = Item(
        name='fantasy cleats',
        type="cleats",
        price=21,
        description='these are the highest quality spider man cleats ive ever sold',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats9.jpg',
        location='',
        team_id=9,
        user_id='4'
    )
    item10 = Item(
        name='running cleats',
        type="cleats",
        price=32,
        description='run forever in these things',
        item_img='https://supercleats-pics.s3.amazonaws.com/cleats10.jpg',
        location='',
        team_id=10,
        user_id='5'
    )
    item11 = Item(
        name='rainbow socks',
        type="socks",
        price=200,
        description='these things weigh nothing!',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock1.jpg',
        location='',
        team_id=11,
        user_id='1'
    )
    item12 = Item(
        name='gripping socks',
        type="socks",
        price=50,
        description='buy one for you friend too!',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock2.jpg',
        location='',
        team_id=12,
        user_id='2'
    )
    item13 = Item(
        name='they call it soccer socks',
        type="socks",
        price=142,
        description='sooo light weight',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock3.jpg',
        location='',
        team_id=13,
        user_id='3'
    )
    item14 = Item(
        name='cool socks',
        type="socks",
        price=45,
        description='very sharp',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock4.jpg',
        location='',
        team_id=14,
        user_id='4'
    )
    item15 = Item(
        name='helpful socks',
        type="socks",
        price=93,
        description='make no mistake when putting these things on',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock5.jpg',
        location='',
        team_id=15,
        user_id='5'
    )
    item16 = Item(
        name='yellow socks',
        type="socks",
        price=10,
        description='you can run for days in these, no blisters',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock6.jpg',
        location='',
        team_id=16,
        user_id='1'
    )
    item17 = Item(
        name='yellow socks',
        type="socks",
        price=22,
        description='warm knees, yes please!',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock7.jpg',
        location='',
        team_id=17,
        user_id='2'
    )
    item18 = Item(
        name='short socks',
        type="socks",
        price=12,
        description='cooool ankles',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock8.jpg',
        location='',
        team_id=16,
        user_id='3'
    )
    item19 = Item(
        name='double socks',
        type="socks",
        price=7,
        description='we stitched together two pairs of socks so you didnt have to',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock9.jpg',
        location='',
        team_id=15,
        user_id='4'
    )
    item20 = Item(
        name='take these socks PLEASE',
        type="socks",
        price=2,
        description='need these gone ASAP',
        item_img='https://supercleats-pics.s3.amazonaws.com/sock10.jpg',
        location='',
        team_id=14,
        user_id='5'
    )
    item21 = Item(
        name='classic ball',
        type="ball",
        price=87,
        description='great for kicking into the goal',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball1.jpg',
        location='',
        team_id=1,
        user_id='1'
    )
    item22 = Item(
        name='old ball',
        type="ball",
        price=76,
        description='buy one for you friend too!',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball2.jpg',
        location='',
        team_id=2,
        user_id='2'
    )
    item23 = Item(
        name='world cup ball',
        type="ball",
        price=65,
        description='sooo light weight',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball3.jpg',
        location='',
        team_id=3,
        user_id='3'
    )
    item24 = Item(
        name='select ball',
        type="ball",
        price=54,
        description='this is the ball to SELECT',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball4.jpg',
        location='',
        team_id=4,
        user_id='4'
    )
    item25 = Item(
        name='very nice ball',
        type="ball",
        price=88,
        description='top notch ball',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball5.jpg',
        location='',
        team_id=5,
        user_id='5'
    )
    item26 = Item(
        name='adidas soccer ball',
        type="ball",
        price=2,
        description='not a bad ball at all',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball6.jpg',
        location='',
        team_id=14,
        user_id='5'
    )
    item27 = Item(
        name='gold ball',
        type="ball",
        price=87,
        description='this ones priceless really',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball7.jpg',
        location='',
        team_id=1,
        user_id='1'
    )
    item28 = Item(
        name='stars ball',
        type="ball",
        price=76,
        description='buy three for you friends!',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball8.jpg',
        location='',
        team_id=2,
        user_id='2'
    )
    item29 = Item(
        name='wiggly world cup',
        type="ball",
        price=65,
        description='you will become a legend gaurenteed',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball9.jpg',
        location='',
        team_id=3,
        user_id='3'
    )
    item30 = Item(
        name='red ball',
        type="ball",
        price=54,
        description='super red',
        item_img='https://supercleats-pics.s3.amazonaws.com/ball10.jpg',
        location='',
        team_id=4,
        user_id='4'
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
    db.session.add(item16)
    db.session.add(item17)
    db.session.add(item18)
    db.session.add(item19)
    db.session.add(item20)
    db.session.add(item21)
    db.session.add(item22)
    db.session.add(item23)
    db.session.add(item24)
    db.session.add(item25)
    db.session.add(item26)
    db.session.add(item27)
    db.session.add(item28)
    db.session.add(item29)
    db.session.add(item30)

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
